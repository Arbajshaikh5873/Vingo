import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
import { isAuth } from "../middleware/isAuth.js";
import { getCurrentUser } from "./user.controller.js";

export async function signUp(req, res) {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });

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

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
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

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password incorrect" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
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

export const sendOtp = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist. " });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;

    user.otpExpires = Date.now() + 5 * 60 * 1000;

    user.isOtpVerified = false;

    await user.save();
    console.log("OTP generated and saved for", email);
    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "Otp send Successfully " });
  } catch (error) {
    return res.status(500).json({ message: "send otp error" + error });
  }
};

export const verifyOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid/expired OTP " });
    }
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({ message: "otp verified successfully " });
  } catch (error) {
    return res.status(500).json({ message: "verify otp error" + error });
  }
};

export const resetPassword = async function (req, res) {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res
        .status(400)
        .json({ message: "OTP verification is required  " });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully " });
  } catch (error) {
    return res.status(500).json({ message: "reset password error " + error });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        mobile: mobile || "",
        role: role || "user",
      });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `googleAuth error ${error}` });
  }
};
