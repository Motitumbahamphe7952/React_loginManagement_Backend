import { Router } from "express";
import {
  createUserController,
  deleteSpecificUserController,
  readSpecificUserController,
  readUserController,
  updateSpecificUserController,
} from "../controller/userController.js";

let userRouter = Router();
userRouter.route("/").post(createUserController).get(readUserController);

userRouter
  .route("/:id")
  .get(readSpecificUserController)
  .patch(updateSpecificUserController)
  .delete(deleteSpecificUserController);

export default userRouter;
