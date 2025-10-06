import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export async function signUp(req, res) {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters." });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile number must be at least 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `sign up error ${error}` });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `sign In error ${error}` });
  }
}

export async function signOut(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully " });
  } catch (error) {
    return res.status(400).json({ message: `sign out error ${error}` });
  }
}
