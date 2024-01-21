import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import monster from "../assets/images/monster.png";

const Sidebar = ({ navigation, selected }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(selected);
  return (
    <div className="flex flex-col w-full h-full justify-between">
      {/* Desk Buttons */}
      <div className="flex flex-col">
        <p className="font-bold text-white text-xl"><i className="text-white font-normal ri-planet-line"> </i>DESK</p>
        <div className="flex flex-col gap-2 pt-8 text-gray-400 text-lg ">
          {navigation
            ? navigation.length > 0 &&
              navigation.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedItem(item.name);
                    navigate(item.link);
                  }}
                  className={`flex gap-3 p-2 px-5 ${
                    item.name !== selectedItem ? "hover:bg-[#212121]" : "   "
                  } transition-all rounded-xl cursor-pointer ${
                    item.name === selectedItem ? "bg-[#5C85E7] text-white" : ""
                  }`}
                >
                  <i className={`${item.icon}`}></i>
                  <p>{item.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      {/* Bottom card */}
      <div className="flex flex-col relative justify-center items-center gap-1 p-4  bg-[#181818] h-48 mb-6 mr-4 rounded-lg ">
        <img src={monster} className="h-[40%] w-[40%] absolute -top-7 left-1/2 -translate-x-1/2 "></img>
        <p className="text-md text-center text-white mt-10">Smart Dashboard</p>
        <p className=" text-xs text-center text-gray-400 mb-2">
          We have developed a new service for Astro Users
        </p>
        <Link className=" glow-theme py-2 px-5 text-center bg-[#5C85E7] rounded-xl text-white text-sm ">
          Details
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
