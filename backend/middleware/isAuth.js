import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    console.log("Inside isAuth middleware ✅");

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found ❌" });
    }

    console.log("Received token:", token);

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token verification failed ❌" });
    }

    console.log("Decoded token:", decodedToken);

    // Attach userId to req for next middleware/routes
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error("isAuth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token ❌" });
  }
};
