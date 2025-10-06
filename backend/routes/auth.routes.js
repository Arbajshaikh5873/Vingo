import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/signout", signOut);

export default authRouter;
