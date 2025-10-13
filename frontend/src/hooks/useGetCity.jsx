import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";
function useGetCity() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    // Fetch city data here
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

        try {
          const result = await axios.get(url);
          dispatch(setCity(result.data.results[0].city));
        } catch (error) {
          console.log("get current city error ", error);
        }
      },
      (error) => {
        console.log("Geolocation error:", error);
      }
    );
  }, [userData]);
}

export default useGetCity;
