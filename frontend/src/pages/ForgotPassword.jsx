import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [setp, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async function () {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
      setErr("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      setStep(1);
      navigate("/signin");
      setErr("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoMdArrowRoundBack
            size={20}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signIn")}
          />
          <h1 className="text-3xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {setp == 1 && (
          <div>
            {/* email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                Email
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200   rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleSendOtp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
            </button>

            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {setp == 2 && (
          <div>
            {/* enter OTP */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                OTP
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200   rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
                value={otp}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify"}{" "}
            </button>

            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {setp == 3 && (
          <div>
            {/* New Password */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                New Password
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200   rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
                value={newPassword}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                {" "}
                Confirm Password
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200   rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Reset Password"
              )}{" "}
            </button>

            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
