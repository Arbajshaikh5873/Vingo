import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      setError("Full name is required");
      setLoading(false);
      return;
    }
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Valid email is required");
      setLoading(false);
      return;
    }
    const trimmedMobile = mobile.trim();
    if (!trimmedMobile || !/^\d{10}$/.test(trimmedMobile)) {
      setError("Mobile number must be exactly 10 digits");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");

      setLoading(false);
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      console.log(result);
      setError("");
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async function () {
    const trimmedMobile = mobile.trim();
    if (!trimmedMobile || !/^\d{10}$/.test(trimmedMobile)) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result, " : sign in with pop up response ");
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      console.log(data);
    } catch (err) {
      console.log(`Google Authentication Error ${err}`);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full  flex items-center justify-center p-4 "
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px] `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className={`text-gray-600 mb-8 `}>
          Create your account to get started with delicious food deliveries
        </p>

        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            required
            value={fullName}
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Email
          </label>
          <input
            type="email"
            className="w-full border  border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            value={email}
          />
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            mobile
          </label>
          <input
            type="tel"
            className="w-full border  border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your mobile number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            required
            value={mobile}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border  border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter your Password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            <button
              className="absolute right-3 top-[14px] text-grey-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            {" "}
            Role
          </label>
          <div className="flex gap-2 ">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
          onClick={() => {
            handleSignUp();
          }}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
        </button>

        {error && (
          <p className="text-red-500 text-center my-[10px]">* {error}</p>
        )}

        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle />
          <span>Sign up with Google </span>
        </button>
        <p className="text-center mt-6 cursor-pointer">
          {" "}
          Already have an account ?{" "}
          <span
            className="text-[#ff4d2d]"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in{" "}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
