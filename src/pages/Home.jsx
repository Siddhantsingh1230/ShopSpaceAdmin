import { useDispatch, useSelector } from "react-redux";
import { navigation } from "../constants/navigation.js";
import { logoutAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ContentPlaceholder from "../components/ContentPlaceholder";
import LineChartComponent from "../components/charts/LineChartComponent.jsx";
import AreaChartComponent from "../components/charts/AreaChartComponent.jsx";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const productsStatus = useSelector((state) => state.product.status);
  return (
    <>
      <div className="flex bg-[#0b0d10] w-full pt-8 h-full ">
        {/* side bar */}
        <div className="w-[18%]  py-4 px-8 pr-4">
          <Sidebar navigation={navigation} selected={"Dashboard"} />
        </div>
        {/* Main */}
        <div className="flex flex-col w-[82%] py-2 px-4  h-full ">
          {/* navbar */}
          <div className="flex justify-between mb-3">
            <p className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
              Dashboard
            </p>
            <div className="flex gap-4 justify-center items-center ">
              {/* Search Bar */}
              <div className="flex p-3 px-5 bg-[#181818] text-gray-200 gap-3 rounded-full w-[26rem]">
                <i className="ri-search-line cursor-pointer opacity-55 hover:opacity-100 transition-all"></i>
                <input
                  className="bg-transparent outline-none w-full"
                  type="text"
                  placeholder="Search"
                />
              </div>
              {/* Notification */}
              <div
                title="Notification"
                className="cursor-pointer relative flex justify-center items-center rounded-full w-10 h-10 bg-[#181818]"
              >
                <i className="cursor-pointer text-xl ri-notification-2-line text-white"></i>
                <span className="top-0 right-0 absolute w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              {/* Language */}
              <div
                title="Language"
                className="cursor-pointer flex justify-center items-center  text-white overflow-hidden"
              >
                En
                <i className="text-white ri-arrow-drop-down-fill"></i>
              </div>
              {/* divider */}
              <span className="h-3/5 border-r-2 border-gray-800"></span>
              {/* User Avatar */}
              <div
                title="User"
                className="cursor-pointer rounded-full w-10 h-10 bg-[#181818] overflow-hidden"
              >
                <img src={user?.profileImageURL} alt="" />
              </div>
            </div>
          </div>
          {/* content */}
          <div className="flex flex-col overflow-y-auto pr-8 mt-0 mb-7  ">
            {/* card div */}
            <div>
              <div className="flex justify-between text-white font-bold text-xl mt-6">
                <p>My cards</p>
                <i className="ri-add-line cursor-pointer opacity-55 transition-all hover:opacity-100"></i>
              </div>
              {/* cards */}
              <div className="thinScroll flex mt-6 w-full gap-6 overflow-x-scroll py-2">
                {/* If cards are not loaded */}
                {!false &&
                  new Array(4).fill(0).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 min-w-60 w-60 h-40 rounded-lg overflow-hidden"
                    >
                      <ContentPlaceholder />
                    </div>
                  ))}
              </div>
            </div>
            {/* analysis */}
            <div>
              <div className="flex justify-between text-white font-bold  mt-8">
                <p className="text-xl">Analysis</p>
                <Link className="text-[#5C85E7] " to={"/"}>
                  Details
                </Link>
              </div>
              {/* Graph cards */}
              <div className="flex mt-6 w-full gap-6">
                {/* graph 1 */}
                <div className="w-96 h-64 overflow-hidden rounded-lg">
                  {productsStatus === "loading" ? (
                    <ContentPlaceholder />
                  ) : (
                    <LineChartComponent
                      data={products.slice(0, 15)}
                      x="title"
                      line="viewCount"
                      stroke="#5C85E7"
                    />
                  )}
                </div>
                {/* graph 2 */}
                <div className="w-96 h-64 overflow-hidden rounded-lg">
                  {productsStatus === "loading" ? (
                    <ContentPlaceholder />
                  ) : (
                    <AreaChartComponent
                      data={products.slice(0, 15)}
                      x="title"
                      area="rating"
                      stroke="#5C85E7"
                      fill={"#436fbc"}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* analysis cards */}
            <div className="mt-8 flex gap-4 text-gray-500">
              <div className="flex flex-col gap-2 p-4 w-48 h-32 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
                <div className="flex justify-between ">
                  <p>Total Bonus</p>
                  <p>+3%</p>
                </div>
                <p className="text-white">$762</p>
              </div>
              <div className="flex flex-col  justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
                <p>Income</p>
                <p className="text-white">$762</p>
                <p className=" text-green-600 text-xs">+5%</p>
              </div>
              <div className="flex flex-col justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
                <p>Deposit</p>
                <p className="text-white">$1,131</p>
                <p className=" text-green-600 text-xs">+12%</p>
              </div>
              <div className="flex flex-col  justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
                <p>Income</p>
                <p className="text-white">$762</p>
                <p className=" text-green-600 text-xs">+5%</p>
              </div>
              <div className="flex flex-col justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
                <p>Deposit</p>
                <p className="text-white">$1,131</p>
                <p className=" text-green-600 text-xs">+12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
