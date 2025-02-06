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
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || allowedOrigins[0]); // ✅ Return valid origin
      } else {
        callback(new Error("CORS policy does not allow this origin"), false);
      }
    },
    credentials: true, // ✅ Required for cookies, sessions, or auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 1800,
  })
);

// Middleware
expressApp.use(json());

// ✅ Fix Access-Control Headers in Routes
expressApp.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // ✅ Only set for valid origins
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



// expressApp.use(json());

// expressApp.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });

expressApp.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ Ensure response includes this header
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin); // ✅ Dynamic origin
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
