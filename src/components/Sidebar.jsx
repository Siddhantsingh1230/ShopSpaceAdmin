import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// Images
import monster from "../assets/images/monster.png";

const Sidebar = ({ navigation }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useState(pathname.split("/")[1]);
  useEffect(() => {
    setSelectedItem(pathname.split("/")[1]);
  }, [pathname]);
  return (
    <div className="flex flex-col w-full h-full justify-between">
      {/* Desk Buttons */}
      <div className="flex flex-col text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 animate-gradient select-none">
        {/* Title */}
        <p className="font-bold  text-xl px-5">
          <i className=" font-normal ri-planet-line"> </i>Desk Space
        </p>
        <div className="flex flex-col gap-2 pt-8 text-gray-400 text-lg ">
          {navigation
            ? navigation.length > 0 &&
              navigation.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    navigate(item.link);
                  }}
                  className={`flex gap-3 p-2 px-5 ${
                    item.name.toLowerCase() !== selectedItem
                      ? "hover:bg-[#212121]"
                      : "   "
                  } transition-all rounded-xl cursor-pointer ${
                    item.name.toLowerCase() === selectedItem
                      ? "bg-[#5C85E7] text-white"
                      : ""
                  }`}
                >
                  <i className={`${item.icon}`}></i>
                  <p>{item.name === "" ? "Dashboard" : item.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      {/* Bottom card */}
      <div className="flex flex-col relative justify-center items-center gap-1 p-4 bg-[#181818] h-[30%] mb-6 mr-4 rounded-lg ">
        <motion.img
          initial={{ x: 0, y: 0 }}
          animate={{ y: [5, -5], rotateZ: [5, -5] }}
          transition={{
            duration: 2,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          drag
          dragConstraints={{ top: 0, right: 0, left: 0, bottom: 0 }}
          src={monster}
          className="h-[40%] w-[40%] absolute -top-7 z-40 cursor-pointer"
        ></motion.img>
        <p className="text-md text-center text-white mt-12 select-none">
          Smart Dashboard
        </p>
        <p className=" text-xs text-center text-gray-400 mb-3 select-none">
          We develop better systems for Astro Users
        </p>
        <a
          href="https://github.com/Siddhantsingh1230/"
          target="_blank"
          className=" glow-theme py-2 px-5 text-center bg-[#5C85E7] rounded-xl text-white text-sm "
        >
          Details
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
