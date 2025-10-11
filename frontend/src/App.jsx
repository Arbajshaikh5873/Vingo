import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";

export const serverUrl = `http://localhost:8000`;
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

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
