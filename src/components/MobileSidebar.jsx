import Drawer from "react-modern-drawer";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { navigation } from "../constants/navigation";
import { motion } from "framer-motion";
// Images
import monster from "../assets/images/monster.png";

const MobileSidebar = () => {
  // For Mobile Viewport Drawer Control
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenuDrawer = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const { pathname } = useLocation();

  //navigation
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  return (
    <>
      <div className="hidden max-sm:inline-flex justify-center items-center ">
        <i onClick={toggleMenuDrawer} className="ri-menu-line"></i>
        <Drawer
          open={isMenuOpen}
          onClose={toggleMenuDrawer}
          direction="left"
          size="85vw"
          className="md:hidden "
          lockBackgroundScroll={true}
        >
          {/* title and buttons */}
          <div className="w-full bg-[#0B0D10] flex flex-col overflow-y-scroll h-full">
            {/* title */}
            <div className="flex justify-between p-3">
              <div className="flex flex-col text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 animate-gradient select-none">
                {/* Title */}
                <p className="font-bold  text-xl">
                  <i className=" font-normal ri-planet-line"> </i>Desk Space
                </p>
              </div>
              <i
                onClick={toggleMenuDrawer}
                className="ri-close-line text-2xl text-gray-500 hover:text-white transition-all font-bold"
              ></i>
            </div>
            {/* divider */}
            <hr className="border-t-2 border-gray-700 mb-3" />
            {/* buttons */}
            <div className="flex flex-col gap-2 text-gray-400 text-lg px-2">
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
                        item.name !== selectedItem
                          ? "hover:bg-[#212121]"
                          : "   "
                      } transition-all rounded-xl cursor-pointer ${
                        item.name === selectedItem
                          ? "bg-[#5C85E7] text-white"
                          : ""
                      }`}
                    >
                      <i className={`${item.icon}`}></i>
                      <p>{item.name}</p>
                    </div>
                  ))
                : null}
            </div>
            {/* Card */}
            <div className="w-full h-[30%] px-5 justify-center items-start flex">
              <div className="flex mt-20 w-full flex-col relative justify-center items-center gap-1 bg-[#181818] h-full rounded-lg ">
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
                  className="h-[40%] w-[30%] absolute -top-7 z-40 cursor-pointer"
                ></motion.img>
                <p className="text-lg text-center text-white mt-12 select-none">
                  Smart Dashboard
                </p>
                <p className="w-[80%] text-xs text-center text-gray-400 mb-3 select-none">
                  We develop better systems for Astro Users
                </p>
                <a
                  href="https://github.com/Siddhantsingh1230/"
                  target="_blank"
                  className=" glow-theme py-3 px-4 text-center bg-[#5C85E7] rounded-lg text-white text-sm "
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default MobileSidebar;
