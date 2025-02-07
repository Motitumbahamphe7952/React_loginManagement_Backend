// import express, { json } from "express";
// import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
// import errorMiddleware from "./src/middleware/errorMiddleware.js";
// import productRouter from "./src/route/productRoute.js";
// import userRouter from "./src/route/userRoute.js";
// import reviewRouter from "./src/route/reviewRoute.js";
// import webUserRouter from "./src/route/webUserRoute.js";
// import cors from "cors";

// let expressApp = express();


// expressApp.use(cors({
//   origin: "https://react-login-management-frontend.vercel.app",
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   credentials: true,
// }));


// // Middleware
// expressApp.use(json());

// expressApp.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });



// expressApp.use("/product", productRouter);
// expressApp.use("/user", userRouter);
// expressApp.use("/review", reviewRouter);
// expressApp.use("/web-users", webUserRouter);
// expressApp.use(errorMiddleware);

// // Call DB connection during initialization
// connectToMongoDb();

// // Export the app for Vercel
// export default expressApp;


import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import productRouter from "./src/route/productRoute.js";
import userRouter from "./src/route/userRoute.js";
import reviewRouter from "./src/route/reviewRoute.js";
import webUserRouter from "./src/route/webUserRoute.js";
import cors from "cors";

const expressApp = express();

// ✅ CORS Configuration - Allow Frontend Access
const allowedOrigins = [
  "https://react-login-management-frontend.vercel.app",
  "https://react-login-management-frontend-fiwu7cf8b.vercel.app"
];

expressApp.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Explicitly handle OPTIONS requests (Preflight)
expressApp.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res.status(204).end();
});

// ✅ Middleware - Parse JSON Request Body
expressApp.use(json());

// ✅ Basic API Status Route
expressApp.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// ✅ API Routes
expressApp.use("/product", productRouter);
expressApp.use("/user", userRouter);
expressApp.use("/review", reviewRouter);
expressApp.use("/web-users", webUserRouter);

// ✅ Error Handling Middleware
expressApp.use(errorMiddleware);

// ✅ Connect to MongoDB
connectToMongoDb().then(() => {
  console.log("✅ MongoDB Connected Successfully");
}).catch(err => {
  console.error("❌ MongoDB Connection Failed:", err);
});

// ✅ Export the App for Vercel Deployment
export default expressApp;

