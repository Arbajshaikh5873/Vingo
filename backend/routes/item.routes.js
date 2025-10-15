import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { addItem } from "../controllers/item.controller.js";
import { upload } from "../middleware/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), addItem);

export default itemRouter;
