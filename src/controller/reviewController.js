import expressAsyncHandler from "express-async-handler";
import { Review } from "../schema/model.js";

export const createReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.create(req.body);
    res.status(201).json({
      success: true,
      message: "review created successfully",
      result: result,
    });
  }
);

export const readReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.find({}); //retrive all the data in the database
    res.status(200).json({
      success: true,
      message: "Review read successfully",
      result: result,
    });
  }
);

export const readSpecificReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review read successfully",
      result: result,
    });
  }
);

export const updateSpecificReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //id, data, {new: true} //without {new: true} database gets updated but postman shows the previous data
    res.status(201).json({
      success: true,
      message: "review updated successfully",
      result: result,
    });
  }
);

export const deleteSpecificReviewController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "review deleted successfully",
      result: result,
    });
  }
);
