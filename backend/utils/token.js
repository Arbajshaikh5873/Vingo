import jwt from "jsonwebtoken";

const genToken = (userId) => {
  console.log("userId inside genToken");
  console.log(userId);
  console.log(userId.toString());

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default genToken;
