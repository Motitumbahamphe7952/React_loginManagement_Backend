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
//   origin: ["https://react-login-management-frontend.vercel.app","http://localhost:5173"], // Use a string for a single origin
//   methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
//   allowedHeaders: ["Content-Type", "Authorization"], 
//   credentials: true,
// }));

// expressApp.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });


// expressApp.use(json());

// connectToMongoDb();

// expressApp.listen(8000, () => {
//   console.log("Server is running at port 8000");
// });


// expressApp.get("/", (req, res) => {
//   res.send("Welcome to the API");
// });

// expressApp.use("/product", productRouter);
// expressApp.use("/user", userRouter);
// expressApp.use("/review", reviewRouter);
// expressApp.use("/web-users", webUserRouter);
// expressApp.use(errorMiddleware);


import express, { json } from "express";
import connectToMongoDb from "./src/connectToDb/connectToMongoDb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import productRouter from "./src/route/productRoute.js";
import userRouter from "./src/route/userRoute.js";
import reviewRouter from "./src/route/reviewRoute.js";
import webUserRouter from "./src/route/webUserRoute.js";
import cors from "cors";

const expressApp = express();

// ✅ Fix CORS Configuration
expressApp.use(cors({
  origin: ["https://react-login-management-frontend.vercel.app", "http://localhost:5173" , "https://reactloginmanagement.motitumbahamphe.com.np"], 
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],  // Include OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
}));

// ✅ Explicitly Handle Preflight (OPTIONS) Requests
expressApp.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);  // Respond with success
});

expressApp.use(json());

// ✅ Ensure MongoDB Connection
connectToMongoDb();

// ✅ Start Server
expressApp.listen(8000, () => {
  console.log("Server is running at port 8000");
});

// ✅ API Routes
expressApp.get("/", (req, res) => {
  res.send("Welcome to the API");
});



expressApp.use("/product", productRouter);
expressApp.use("/user", userRouter);
expressApp.use("/review", reviewRouter);
expressApp.use("/web-users", webUserRouter);
expressApp.use(errorMiddleware);

