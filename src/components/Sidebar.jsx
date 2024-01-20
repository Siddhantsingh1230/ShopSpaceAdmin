import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Sidebar = ({ navigation,selected }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(selected);
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="flex flex-col">
        <p className="font-bold text-white text-xl">SHOP SPACE DESK</p>
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
                  className={
                    item.name === selectedItem
                      ? "flex gap-3 p-2 px-5 bg-[#5C85E7] rounded-xl text-white"
                      : "flex gap-3 p-2 px-5 bg-[#101010] rounded-xl"
                  }
                >
                  <i className={`${item.icon}`}></i>
                  <p>{item.name}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 p-4 bg-[#181818] h-48 mb-6 mr-4 rounded-lg ">
        <img></img>
        <p className="text-md text-center text-white">Smart Investment</p>
        <p className=" text-xs text-center text-gray-300">We have developed a service for novice investors</p>
        <Link className="p-2 w-32 text-center bg-[#5C85E7] rounded-xl text-white text-sm ">More detailed</Link>
      </div>
    </div>
  );
};

export default Sidebar;
