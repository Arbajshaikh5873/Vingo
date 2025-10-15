import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";

export const serverUrl = "http://localhost:8000";
function App() {
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result);
          // Handle the user, e.g., send to backend or navigate
        }
      } catch (error) {
        console.log("Redirect error:", error);
      }
    };
    handleRedirectResult();
  }, []);

  useGetCurrentUser();
  useGetCity();
  useGetMyShop();

  const { userData } = useSelector((state) => state.user);
  console.log("Current user data:", userData);
  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signup" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
