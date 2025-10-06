import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use(
  cors({
    origin: "http://locahost:5173",
    credentials: true,
  })
);

app.listen(PORT, () => {
  connectDb();
  console.log("server is running on port " + PORT);
});
app.get("/", (req, res) => {
  res.send("Server is running ");
});
