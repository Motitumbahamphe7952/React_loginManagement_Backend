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

// ✅ Define Allowed Origins
const allowedOrigins = [
  "https://react-login-management-frontend.vercel.app",
  "https://react-login-management-frontend-fiwu7cf8b.vercel.app",
];

expressApp.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, false); // Prevent setting "undefined"
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error("CORS policy does not allow this origin"), false);
    },
    credentials: true, // ✅ Allow cookies, auth headers, etc.
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 1800,
  })
);

expressApp.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Handle Preflight Requests (Important for CORS)
expressApp.options("*", (req, res) => {
  res.status(200).send();
});

// Middleware
expressApp.use(json());

// ✅ Default Route
expressApp.get("/", (req, res) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("Welcome to the API");
});




// expressApp.use(json());

// expressApp.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });



expressApp.use("/product", productRouter);
expressApp.use("/user", userRouter);
expressApp.use("/review", reviewRouter);
expressApp.use("/web-users", webUserRouter);
expressApp.use(errorMiddleware);

// Call DB connection during initialization
connectToMongoDb();

// Export the app for Vercel
export default expressApp;
