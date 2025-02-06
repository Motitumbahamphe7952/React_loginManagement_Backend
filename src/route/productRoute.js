import { Router } from "express";
import {
  createProductController,
  deleteSpecificProductController,
  readProductController,
  readSpecificProductController,
  updateSpecificProductController,
} from "../controller/productController.js";

let productRouter = Router();
productRouter.route("/")
  .post(createProductController)
  .get(readProductController);

productRouter.route("/:id")
  .get(readSpecificProductController)
  .patch(updateSpecificProductController)
  .delete(deleteSpecificProductController);

export default productRouter;
