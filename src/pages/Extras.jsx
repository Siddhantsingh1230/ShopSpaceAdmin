import MobileSidebar from "../components/MobileSidebar";
import UserAvatar from "../components/UserAvatar";
import { useState } from "react";
import Tabs from "../components/Tabs";
import DealOfTheDay from "../components/DealOfTheDay";
import CalenderTab from "../components/CalenderTab";
import TodoCards from "../components/TodoCards";
import Users from "../components/Users";

const Extras = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const TabHeaderAndComponnets = [
    {
      name: "Cards",
      icon:"ri-check-double-fill",
      Component: TodoCards,
    },
    {
      name: "Deal Of The Day",
      icon:"ri-discount-percent-line",
      Component: DealOfTheDay,
    },
    {
      name: "Calender",
      icon:"ri-calendar-schedule-line",
      Component: CalenderTab,
    },{
      name: "Users",
      icon:"ri-user-line",
      Component: Users,
    }
  ];
  return (
    <>
      {/* navbar */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex  items-center justify-between mb-3 w-full max-sm:px-3"
      >
        <div className="max-sm:text-3xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
          <MobileSidebar /> Extras
        </div>
        {/* User Avatar */}
        <UserAvatar
          userDropDown={userDropDown}
          toggleUserDropDown={toggleUserDropDown}
        />
      </div>
      {/* Main */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto max-sm:mt-0  mt-2 mb-7 h-full max-sm:w-full max-sm:px-3"
      >
        <Tabs headerComponent={TabHeaderAndComponnets} />
      </div>
    </>
  );
};

export default Extras;
