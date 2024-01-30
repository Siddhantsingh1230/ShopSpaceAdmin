import { useState } from "react";

const Tabs = ({ headerComponent }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="tabHeader h-auto w-full flex items-center max-sm:gap-2 gap-10">
          {headerComponent.map((item, key) => (
            <div
              className={`${
                selectedTabIndex === key
                  ? "text-blue-400 bg-[#131313] "
                  : "text-gray-400"
              } text-sm flex gap-1 px-4 select-none py-2 rounded-t-lg  transition-all cursor-pointer hover:text-blue-400`}
              onClick={()=>setSelectedTabIndex(key)}
            >
              <i className={item.icon}></i>
              <span className="max-sm:hidden">{item.name}</span>
            </div>
          ))}
        </div>
        {/* Body */}
        <div className="tabBody w-full h-full bg-[#131313] rounded-b-lg"></div>
      </div>
    </>
  );
};

export default Tabs;
