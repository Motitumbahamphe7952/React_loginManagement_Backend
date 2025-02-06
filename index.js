import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import productRouter from "./src/route/productRoute.js";
import userRouter from "./src/route/userRoute.js";
import reviewRouter from "./src/route/reviewRoute.js";
import webUserRouter from "./src/route/webUserRoute.js";
import cors from "cors";

let expressApp = express();

expressApp.use(cors({
  origin: ["https://react-login-management-frontend.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

expressApp.use(json());

expressApp.get("/", (req, res) => {
  res.send("Welcome to the API");
});

expressApp.use("/product", productRouter);
expressApp.use("/user", userRouter);
expressApp.use("/review", reviewRouter);
expressApp.use("/web-users", webUserRouter);
expressApp.use(errorMiddleware);

// Call DB connection during initialization
connectToMongoDb();

// Export the app for Vercel
export default expressApp;
