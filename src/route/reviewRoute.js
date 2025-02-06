import { Router } from "express";
import {
  createReviewController,
  deleteSpecificReviewController,
  readReviewController,
  readSpecificReviewController,
  updateSpecificReviewController,
} from "../controller/reviewController.js";

let reviewRouter = Router();
reviewRouter.route("/").post(createReviewController).get(readReviewController);

reviewRouter
  .route("/:id")
  .get(readSpecificReviewController)
  .patch(updateSpecificReviewController)
  .delete(deleteSpecificReviewController);

export default reviewRouter;
