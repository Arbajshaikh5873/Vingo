import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

export const serverUrl = `http://localhost:8000`;
function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
