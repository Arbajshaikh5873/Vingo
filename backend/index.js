import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import shopRouter from "./routes/shop.routes.js";
import itemRouter from "./routes/item.routes.js";

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
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);

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
