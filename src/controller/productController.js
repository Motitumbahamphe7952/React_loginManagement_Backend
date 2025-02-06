import expressAsyncHandler from "express-async-handler";
import { Product } from "../schema/model.js";

export const createProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "product created successfully",
      result: result,
    });
  }
);

export const readProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.find({}); //retrive all the data in the database
    res.status(200).json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  }
);

export const readSpecificProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  }
);

export const updateSpecificProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //id, data, {new: true} //without {new: true} database gets updated but postman shows the previous data
    res.status(201).json({
      success: true,
      message: "product updated successfully",
      result: result,
    });
  }
);

export const deleteSpecificProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
      result: result,
    });
  }
);


