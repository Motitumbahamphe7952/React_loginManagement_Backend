import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WebUser } from "../schema/model.js";
import { sendEmail } from "../utils/sendMail.js";
import { secretKey } from "../validation/constant.js";
import expressAsyncHandler from "express-async-handler";

export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    let hashpassword = await bcrypt.hash(data.password, 10);
    data = {
      ...data,
      isVerifiedEmail: false,
      password: hashpassword,
    };
    let result = await WebUser.create(data);

    // send email with link
    // generate token
    let info = {
      _id: result._id,
    };
    let secretKey = "dw18";
    let expiryInfo = {
      expiresIn: "365d",
    };

    let myToken = jwt.sign(info, secretKey, expiryInfo);

    // link => frontend link
    //send mail
    await sendEmail({
      from: "yolo",
      to: data.email,
      subject: "account create",
      html: `
      <h1> your account has been created successfully </h1>
      <a href = "http://localhost:5173/verify-email?token=${myToken}">
      http://localhost:5173/verify-email?token=${myToken}
      </a>
      `,
    });
    res.status(201).json({
      success: true,
      message: "user created successfully.",
      data: result,
    });
  }
);

export const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let tokenString = req.headers.authorization;
  let tokenArray = tokenString.split(" ");
  let token = tokenArray[1];

  //verify token
  let infoObj = await jwt.verify(token, secretKey);
  let userId = infoObj._id;

  // Update the user's email verification status
  await WebUser.findByIdAndUpdate(
    userId,
    { isVerifiedEmail: true },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "user verified successfully.",
  });
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await WebUser.findOne({ email: email });

  if (user) {
    if (user.isVerifiedEmail) {
      let isValidpassword = await bcrypt.compare(password, user.password);
      if (isValidpassword) {
        let infoObj = {
          _id: user._id,
        };
        let expiryInfo = {
          expiresIn: "365d",
        };

        let myToken = await jwt.sign(infoObj, secretKey, expiryInfo);
        res.status(200).json({
          success: true,
          message: "user login successful.",
          data: user,
          token: myToken,
        });
      } else {
        let error = new Error("credential doesn't match1");
        throw error;
      }
    } else {
      let error = new error("credential doesn't match2");
      throw error;
    }
  } else {
    let error = new Error("credential does not match3");
    throw error;
  }
});

export const myProfile = expressAsyncHandler(async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "profile read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to read profile",
    });
  }
});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {
  let _id = req._id;
  let data = req.body;
  delete data.email;
  delete data.password;

  let result = await WebUser.findByIdAndUpdate(_id, data, { new: true }); //new:true gives the new updated data

  res.status(201).json({
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {
  let _id = req._id;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  let data = await WebUser.findById(_id);
  let hashPassword = data.password;

  let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

  if (isValidPassword) {
    let newHashPassword = await bcrypt.hash(newPassword, 10);

    let result = await WebUser.findByIdAndUpdate(
      _id,
      {
        password: newHashPassword,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "updated password successfully",
      data: result,
    });
  } else {
    let error = new Error("credential does not matched");
    throw error;
  }
});

export const readAllUser = expressAsyncHandler(async (req, res, next) => {
  let result = await WebUser.find({});
  res.status(200).json({
    success: true,
    message: "all user read successfully",
    data: result,
  });
});

export const readSpecificUser = expressAsyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let result = await WebUser.findById(id);
  res.status(200).json({
    success: true,
    message: "user read successfully",
    data: result,
  });
});

export const updateSpecificUser = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "user updated successfully",
      data: result,
    });
  }
);

export const deleteSpecificUser = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let result = await WebUser.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: result,
    });
  }
);

export const forgotPassword = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;

  let result = await WebUser.findOne({ email: email });
  // result = null or {....}
  if (result) {
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };

    let myToken = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      from: "yolo",
      to: email,
      subject: "Reset Password",
      html: `
        <h1> please click given link to reset password </h1>
        <a href = "http://localhost:5173/reset-password?token=${myToken}">
        http://localhost:5173/reset-password?token=${myToken}
        </a>
        `,
    });
    res.status(200).json({
      success: true,
      message: "Link has been sent to your email to reset password",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "email doesn't exist",
    });
  }
});

export const resetPassword = expressAsyncHandler(async (req, res, next) => {
  let hashPassword = await bcrypt.hash(req.body.password, 10);
  let result = await WebUser.findByIdAndUpdate(
    req._id,
    { password: hashPassword },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "password reset successfully",
    data: result,
  });
});

//find({})
//findById({})
//findByIdAndUpdate({})
