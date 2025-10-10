// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";

// dotenv.config({
//   path: "./.env",
// });

// import connectDb from "./config/db.js";

// // import authRouter from "./routes/auth.routes.js";

// const PORT = process.env.PORT || 8000;
// const app = express();

// // Middleware order matters
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
// // app.use(express.json());
// // app.use(cookieParser());
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // app.use("/api/auth", authRouter);

// // app.listen(PORT, async () => {
// //   await connectDb();
// //   app.on("error", (err) => {
// //     console.log(`Error in server setup: ${err}`);
// //   });
// //   console.log(`Server is running on http://localhost:${PORT}`);
// // });

// connectDb()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`DB connected and running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MongoDB connection failed !!!! " + err);
//   });

// app.get("/", (req, res) => {
//   res.send("API is running....");
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected and running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!! " + err);
  });

app.get("/", (req, res) => {
  res.send("Hello jiii from vingo ");
});
