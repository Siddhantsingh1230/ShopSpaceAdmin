import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { navigation } from "../constants/navigation";

const Statistics = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className="flex bg-black w-full pt-8 h-screen">
          {/* side bar */}
          <div className=" w-1/5  py-4 px-8 pr-4">
            <Sidebar navigation = {navigation} selected = {"Statistics"} />
          </div>
          <div className="flex flex-col w-full py-2 px-4  h-full text-white">
          </div>
          
          {/* <button
            className="p-2 px-3 hover:bg-blue-700 transition-colors rounded-lg m-5 bg-blue-500 text-white"
            onClick={() => dispatch(logoutAsync())}
          >
            logout
          </button> */}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Statistics;
