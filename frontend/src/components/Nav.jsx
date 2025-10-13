import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showsearch, setShowsearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log("logout error ", error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {/* search in small screen devices */}
      {showsearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] fixed flex top-[80px] left-[5%]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 ">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className=" w-[80%] truncate text-gray-600">{city}</div>
          </div>
          {/* search */}
          <div className=" w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full "
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      <div className="hidden md:flex md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] ">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400 ">
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className=" w-[80%] truncate text-gray-600">{city}</div>
        </div>
        {/* search */}
        <div className=" w-[80%] flex items-center gap-[10px]">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full "
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!showsearch && (
          <IoIosSearch
            size={25}
            className="md:hidden text-[#ff4d2d] "
            onClick={() => {
              console.log("cliked inside navbar search");
              setShowsearch(true);
            }}
          />
        )}

        {showsearch && (
          <RxCross2
            size={25}
            className="md:hidden text-[#ff4d2d]"
            onClick={() => {
              setShowsearch(false);
            }}
          />
        )}
        {/* cart icon */}
        <div className="relative cursor-pointer ">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>

        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
          My Orders
        </button>
        {/* userName */}
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => {
            setShowInfo((prev) => !prev);
          }}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* popup */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullName}</div>
            <div className="md:hidden flex text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
