import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import productRouter from "./src/route/productRoute.js";
import userRouter from "./src/route/userRoute.js";
import reviewRouter from "./src/route/reviewRoute.js";
import webUserRouter from "./src/route/webUserRoute.js";
import cors from "cors";

let expressApp = express();

// expressApp.use(cors({
//   origin: [ "https://react-login-management-frontend.vercel.app",
//            "https://react-login-management-frontend-fiwu7cf8b.vercel.app"
//           ],
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   credentials: true,
// }));
expressApp.use(cors());
expressApp.use(
  cors({
    origin: "*", // Change to a specific origin if needed
    credentials: true, // Allow cookies & credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    maxAge: 1800, // Cache preflight response for 30 minutes
  })
);

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
