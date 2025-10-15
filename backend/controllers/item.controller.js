import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;

    let image;

    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req._id });

    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }

    const item = Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });

    res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ message: "add item error", error });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const { name, category, price, foodType } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = Item.findOneAndUpdate(
      itemId,
      { name, category, price, foodType, image },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({ message: "item not found error" });
    }
  } catch (error) {
    return res.status(400).json({ message: "edit item error", error });
  }
};
