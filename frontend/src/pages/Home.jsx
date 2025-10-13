import React from "react";
import UserDashboard from "../components/UserDashboard";
import DeliveryBoy from "../components/DeliveryBoy";
import OwnerDashboard from "../components/OwnerDashboard";
import { useSelector } from "react-redux";

function Home() {
  const { userData } = useSelector((state) => state.user);
  console.log("User Data in Home:", userData);

  return (
    <div className="w-[100vW] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff96f] ">
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "deliveryBoy" && <DeliveryBoy />}
      {userData.role == "owner" && <OwnerDashboard />}
    </div>
  );
}

export default Home;
