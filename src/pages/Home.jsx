import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentPlaceholder from "../components/ContentPlaceholder";
import LineChartComponent from "../components/charts/LineChartComponent.jsx";
import AreaChartComponent from "../components/charts/AreaChartComponent.jsx";
import UserAvatar from "../components/UserAvatar.jsx";
import Notifications from "../components/Notifications.jsx";
import MobileSidebar from "../components/MobileSidebar.jsx";
import { getAllNotes } from "../api/notes.js";
import { AnimatePresence, motion } from "framer-motion";
import {
  getTotalEarningsAsync,
  getTotalCartItemsAsync,
  getTotalOrdersAsync,
} from "../slices/ordersSlice.js";
import { getTotalViewsAsync } from "../slices/productsSlice.js";
import { getTotalUsersAsync } from "../slices/userSlice.js";
import DotBg from "../components/DotBg.jsx";

const Home = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  // Mobile screen or not
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Check if the width is less than a certain threshold (e.g., 768 for typical mobile devices)
      setIsMobile(window.innerWidth < 768);
    };
    // Initial check on component mount
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const totalCartItems = useSelector((state) => state.order.totalCartItems);
  const totalEarnings = useSelector((state) => state.order.totalEarnings);
  const totalUsers = useSelector((state) => state.user.totalUsers);
  const totalViews = useSelector((state) => state.product.totalViews);
  const dispatch = useDispatch();

  useEffect(() => {
    getCards();
    dispatch(getTotalEarningsAsync());
    dispatch(getTotalViewsAsync());
    dispatch(getTotalOrdersAsync());
    dispatch(getTotalCartItemsAsync());
    dispatch(getTotalUsersAsync());
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
            <i
              onClick={() => navigate("/extras")}
              className="ri-add-line cursor-pointer opacity-55 transition-all hover:opacity-100"
            ></i>
          </div>
          {/* cards */}
          <div className="thinScroll flex mt-6 w-full gap-6 overflow-x-auto py-2">
            {/* If cards are not loaded */}
            {cards.length > 0 ? (
              <>
                <AnimatePresence>
                  {/* get Random cards */}
                  {cards
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4)
                    .map((item, key) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                        drag={!isMobile}
                        dragConstraints={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0,
                        }}
                        onClick={() => navigate("/extras")}
                        key={key}
                        className={`flex-1  bg-[#181818] cursor-pointer relative  max-sm:min-w-full min-w-60 w-60 h-28 rounded-lg overflow-hidden grid grid-cols-3 ${
                          item.category == "task"
                            ? "bg-[#7e3ff4] "
                            : item.category == "report"
                            ? "bg-[#eb7f48] "
                            : "bg-[#ee3fd7] "
                        }`}
                      >
                        <div
                          className={`flex col-span-1 justify-between items-center ${
                            item.category == "task"
                              ? "bg-[#844af0] "
                              : item.category == "report"
                              ? "bg-[#f1702f] "
                              : "bg-[#ee2dd4] "
                          } `}
                        >
                          <h1 className="flex flex-col justify-center items-center text-md  px-5 py-1 select-none font-bold font-mono text-white">
                            <i
                              className={`${
                                item.category == "task"
                                  ? "ri-todo-line"
                                  : item.category == "report"
                                  ? "ri-file-chart-line"
                                  : "ri-file-list-3-line"
                              } font-normal text-center`}
                            ></i>{" "}
                            {item.category.toUpperCase()}
                          </h1>
                        </div>
                        <div
                          className={`w-full overflow-hidden col-span-2 text-white text-sm
                          ${
                            item.category == "task"
                              ? "text-[#7e3ff4] "
                              : item.category == "report"
                              ? "text-[#eb7f48] "
                              : "text-[#ee3fd7] "
                          }  
                          select-none h-full p-3 max-sm:text-sm whitespace-break-spaces `}
                        >
                          <p className=" text-xs flex items-center absolute top-3 right-3">
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
                          <div className="flex mt-7 gap-2 overflow-hidden h-14">
                            <i
                              className={`${
                                item.category == "task"
                                  ? " ri-magic-line "
                                  : item.category == "report"
                                  ? "ri-triangle-line"
                                  : "ri-focus-2-line "
                              } text-gray-300`}
                            ></i>{" "}
                            {item.title}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </>
            ) : (
              new Array(4).fill(0).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 max-sm:min-w-full min-w-60 w-60 h-28 rounded-lg overflow-hidden"
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
            <div className="flex-1 relative max-sm:min-w-full flex-col p-4 w-48 h-36 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="bg-[#131313] w-12 h-12 rounded-full flex items-center justify-center">
                <i className="z-20 relative ri-eye-fill text-2xl text-white"></i>
              </div> 
              <div className="z-20 relative flex mt-3">
                <div className="flex flex-col line">
                  <p className="text-white text-2xl text-center">
                    {totalViews}
                  </p>
                  <p className="mt-0 pt-0 text-sm">Views</p>
                </div>
                <i className="ri-pulse-line absolute bottom-4 right-4 text-6xl text-[#fe5950]"></i>
              </div>
              <DotBg color={"#342424"} />
            </div>
            <div className="flex-1 relative max-sm:min-w-full flex-col p-4 w-48 h-36 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="z-20 relative bg-[#131313] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#4772d5]">
                <i className="ri-shopping-bag-line text-2xl text-white"></i>
              </div>
              <div className="z-20 relative flex mt-3">
                <div className="flex flex-col line">
                  <p className="text-white text-2xl text-center">
                    {totalOrders}
                  </p>
                  <p className="mt-0 pt-0 text-sm">Orders</p>
                </div>
                <i className="ri-bar-chart-grouped-fill absolute bottom-4 right-4 text-6xl text-[#3261D2]"></i>
              </div>
              <DotBg color={"#342424"} />
            </div>
            <div className="flex-1 relative max-sm:min-w-full flex-col p-4 w-48 h-36 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="z-20 relative bg-[#131313] w-12 h-12 rounded-full flex items-center justify-center">
                <i className="ri-user-3-line text-2xl text-white"></i>
              </div>
              <div className="z-20 relative flex mt-3">
                <div className="flex flex-col line">
                  <p className="text-white text-2xl text-center">
                    {totalUsers}
                  </p>
                  <p className="mt-0 pt-0 text-sm">Users</p>
                </div>
                <i className="ri-team-fill absolute bottom-4 right-4 text-5xl text-[#37a55e]"></i>
              </div>
              <DotBg color={"#342424"} />
            </div>
            <div className="flex-1 relative max-sm:min-w-full flex-col p-4 w-48 h-36 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="z-20 relative bg-[#131313] w-12 h-12 rounded-full flex items-center justify-center">
                <i className="ri-shopping-cart-line text-2xl text-white"></i>
              </div>
              <div className="z-20 relative flex mt-3">
                <div className="flex flex-col line">
                  <p className="text-white text-2xl text-center">
                    {totalCartItems}
                  </p>
                  <p className="mt-0 pt-0 text-sm">Carts</p>
                </div>
                <i className="ri-bar-chart-fill  absolute bottom-4 right-4 text-6xl text-[#5e309f]"></i>
              </div>
              <DotBg color={"#342424"} />
            </div>
            <div className="flex-1 relative max-sm:min-w-full flex-col p-4 w-48 h-36 bg-[#181818] rounded-lg transition-all cursor-pointer hover:bg-[#5C85E7] hover:text-white">
              <div className="z-20 relative bg-[#131313] w-12 h-12 rounded-full flex items-center justify-center">
                <i className="ri-cash-line text-2xl text-white"></i>
              </div>
              <div className="z-20 relative flex mt-3">
                <div className="flex flex-col line">
                  <p className="text-white text-2xl text-center">
                    ₹{totalEarnings}
                  </p>
                  <p className="mt-0 pt-0 text-sm">Earnings</p>
                </div>
                <i className="ri-exchange-funds-fill absolute bottom-4 right-4 text-5xl text-[#f2f24b]"></i>
              </div>
              <DotBg color={"#342424"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
