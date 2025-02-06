import expressAsyncHandler from "express-async-handler";
import { User } from "../schema/model.js";

export const createUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      result: result,
    });
  }
);

export const readUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.find({}); //retrive all the data in the database
    res.status(200).json({
      success: true,
      message: "User read successfully",
      result: result,
    });
  }
);

export const readSpecificUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User read successfully",
      result: result,
    });
  }
);

export const updateSpecificUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //id, data, {new: true} //without {new: true} database gets updated but postman shows the previous data
    res.status(201).json({
      success: true,
      message: "user updated successfully",
      result: result,
    });
  }
);

export const deleteSpecificUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      result: result,
    });
  }
);

