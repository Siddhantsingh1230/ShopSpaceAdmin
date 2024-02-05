import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentPlaceholder from "../components/ContentPlaceholder";
import LineChartComponent from "../components/charts/LineChartComponent.jsx";
import AreaChartComponent from "../components/charts/AreaChartComponent.jsx";
import UserAvatar from "../components/UserAvatar.jsx";
import Notifications from "../components/Notifications.jsx";
import MobileSidebar from "../components/MobileSidebar.jsx";
import { getAllNotes } from "../api/notes.js";

const Home = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const toggleNotificationDropDown = () => {
    setNotificationDropDown((state) => !state);
  };
  const products = useSelector((state) => state.product.products);
  const user = useSelector((state) => state.auth.user);
  const mostOrderedProducts = useSelector(
    (state) => state.product.mostOrderedProducts
  );
  const productsStatus = useSelector((state) => state.product.status);

  const getCards = async () => {
    const { notes } = await getAllNotes(user._id);
    setCards(notes);
  };
  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {/* navbar */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
          if (notificationDropDown) {
            toggleNotificationDropDown();
          }
        }}
        className="flex  max-sm:flex-col max-sm:gap-4 justify-between items-center mb-3 w-full  max-sm:px-3"
      >
        <div className="max-sm:text-3xl max-sm:w-full text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
          <MobileSidebar /> Dashboard
        </div>
        <div className="flex gap-4  justify-center max-sm:justify-between items-center max-sm:w-full">
          {/* Search Bar */}
          <div className="flex p-3 px-5 max-sm:p-2 max-sm:px-3 bg-[#181818] text-gray-200 gap-3 rounded-full max-sm:w-[12rem] w-[26rem]">
            <i className="ri-search-line cursor-pointer opacity-55 hover:opacity-100 transition-all"></i>
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Search"
            />
          </div>
          {/* Notification */}
          <Notifications
            notificationDropDown={notificationDropDown}
            toggleNotificationDropDown={toggleNotificationDropDown}
            closeOther={setUserDropDown}
          />
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
          <UserAvatar
            userDropDown={userDropDown}
            toggleUserDropDown={toggleUserDropDown}
            closeOther={setNotificationDropDown}
          />
        </div>
      </div>
      {/* content */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
          if (notificationDropDown) {
            toggleNotificationDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto h-full pr-8 mt-0 mb-2  max-sm:w-full max-sm:px-3"
      >
        {/* card div */}
        <div>
          <div className="flex justify-between text-white font-bold text-xl mt-6">
            <p>My Cards</p>
            <i className="ri-add-line cursor-pointer opacity-55 transition-all hover:opacity-100"></i>
          </div>
          {/* cards */}
          <div className="thinScroll flex mt-6 w-full gap-6 overflow-x-auto py-2">
            {/* If cards are not loaded */}
            {cards.length > 0 ? (
              <>
                {/* get Random cards */}
                {cards
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 4)
                  .map((item, key) => (
                    <div
                      onClick={() => navigate("/extras")}
                      key={key}
                      className={`flex-1  bg-[#181818] cursor-pointer   max-sm:min-w-full min-w-60 w-60 h-40 rounded-lg overflow-hidden flex flex-col`}
                    >
                      <div className={`flex justify-between items-center ${
                        item.category == "task"
                          ? "bg-[#7e3ff4] "
                          : item.category == "report"
                          ? "bg-[#eb7f48] "
                          : "bg-[#ee3fd7] "
                      } `}>
                        <h1 className="text-xl text-ellipsis text-nowrap overflow-hidden  px-5 py-2 select-none text-gray-900 font-bold font-mono">
                          <i
                            className={`${
                              item.category == "task"
                                ? " ri-magic-line "
                                : item.category == "report"
                                ? "ri-triangle-line"
                                : "ri-focus-2-line "
                            }  font-normal`}
                          ></i>{" "}
                          {item.category.toUpperCase()}
                        </h1>
                        <p className="text-xs px-5 flex items-center">
                          {String(
                            `${String(
                              new Date(item.createdAt).getDate()
                            ).padStart(2, "0")}/${String(
                              new Date(item.createdAt).getMonth() + 1
                            ).padStart(2, "0")}/${new Date(
                              item.createdAt
                            ).getFullYear()}`
                          )}
                          <i className="pl-2 ri-time-line"></i>
                        </p>
                      </div>
                      <div className={`w-full overflow-hidden ${
                        item.category == "task"
                          ? "text-[#7e3ff4] "
                          : item.category == "report"
                          ? "text-[#eb7f48] "
                          : "text-[#ee3fd7] "
                      }  select-none h-full p-5 whitespace-break-spaces`}>
                        {item.title}
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              new Array(4).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 max-sm:min-w-full min-w-60 w-60 h-40 rounded-lg overflow-hidden"
                >
                  <ContentPlaceholder />
                </div>
              ))
            )}
          </div>
        </div>
        {/* analysis */}
        <div>
          <div className="flex justify-between text-white font-bold  mt-8">
            <p className="text-xl">Overview</p>
            <Link className="text-[#5C85E7] " to={"/statistics"}>
              More
            </Link>
          </div>
          {/* Graph cards */}
          <div className="flex max-sm:flex-col mt-6 w-full gap-6 h-full">
            {/* graph 1 */}
            <div className="w-96 h-64 max-sm:w-80  overflow-hidden rounded-lg">
              {productsStatus === "loading" ? (
                <ContentPlaceholder />
              ) : (
                <LineChartComponent
                  data={products?.slice(0, 15)}
                  x="title"
                  line="viewCount"
                  stroke="#5C85E7"
                />
              )}
            </div>
            {/* graph 2 */}
            <div className="w-96 h-64 max-sm:w-80  overflow-hidden rounded-lg">
              {productsStatus === "loading" ? (
                <ContentPlaceholder />
              ) : (
                <LineChartComponent
                  data={products?.slice(0, 15)}
                  x="title"
                  line="rating"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              )}
            </div>
            {/* graph 3 */}
            <div className="w-96 h-64 max-sm:w-80  overflow-hidden rounded-lg">
              {productsStatus === "loading" ? (
                <ContentPlaceholder />
              ) : (
                <AreaChartComponent
                  data={mostOrderedProducts}
                  x="title"
                  area="orders"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              )}
            </div>
          </div>
        </div>
        {/* analysis cards */}
        <div>
          <div className="mt-8 flex max-sm:w-full overflow-x-auto overflow-y-hidden max-sm:h-auto  gap-5 text-gray-500">
            <div className="flex max-sm:min-w-full flex-col gap-2 p-4 w-48 h-32 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="flex justify-between ">
                <p>Total Bonus</p>
                <p>+3%</p>
              </div>
              <p className="text-white">$762</p>
            </div>
            <div className="flex max-sm:min-w-full flex-col  justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <p>Income</p>
              <p className="text-white">$762</p>
              <p className=" text-green-600 text-xs">+5%</p>
            </div>
            <div className="flex max-sm:min-w-full flex-col justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <p>Deposit</p>
              <p className="text-white">$1,131</p>
              <p className=" text-green-600 text-xs">+12%</p>
            </div>
            <div className="flex max-sm:min-w-full flex-col  justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <p>Income</p>
              <p className="text-white">$762</p>
              <p className=" text-green-600 text-xs">+5%</p>
            </div>
            <div className="flex max-sm:min-w-full flex-col justify-center gap-2 w-48 h-32 bg-[#181818] p-4 rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <p>Deposit</p>
              <p className="text-white">$1,131</p>
              <p className=" text-green-600 text-xs">+12%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
