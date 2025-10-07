import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware order matters
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ FIXED typo
    // credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", (req, res) => {
  console.log("Hello");

  res.send("API is running....");
});
