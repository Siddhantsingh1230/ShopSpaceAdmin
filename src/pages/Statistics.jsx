import { useState } from "react";
import UserAvatar from "../components/UserAvatar";
import MobileSidebar from "../components/MobileSidebar";
import { useSelector } from "react-redux";
import ContentPlaceholder from "../components/ContentPlaceholder";
import LineChartComponent from "../components/charts/LineChartComponent";
import AreaChartComponent from "../components/charts/AreaChartComponent";

const Statistics = () => {
  const products = useSelector((state) => state.product.products);
  const [userDropDown, setUserDropDown] = useState(false);
  const mostOrderedProducts = useSelector(
    (state) => state.product.mostOrderedProducts
  );
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const productsStatus = useSelector((state) => state.product.status);
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
          <MobileSidebar /> Statistics
        </div>
        {/* User Avatar */}
        <UserAvatar
          userDropDown={userDropDown}
          toggleUserDropDown={toggleUserDropDown}
        />
      </div>
      {/* content */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col gap-6 overflow-y-auto max-sm:mt-0  mt-2 mb-7 text-white  max-sm:w-full max-sm:px-3 h-full"
      >
        <div className="flex h-1/2 gap-6 pr-10">
          <div className="flex bg-gradient-to-tr from-[#49349e]  via-[#2c206f] to-[#1E1B33] h-full w-4/6 border border-gray-700 rounded-lg ">
            {/* graph 1 */}
            <div className="w-full h-full max-sm:w-80  overflow-hidden rounded-lg p-2 pt-10 pr-10 select-none">
              {productsStatus === "loading" ? (
                <ContentPlaceholder />
              ) : (
                <LineChartComponent
                  data={products}
                  x="title"
                  line="viewCount"
                  stroke="#5C85E7"
                />
              )}
            </div>
          </div>
          <div className="flex h-full w-1/3 bg-[#1a1733] border border-gray-700 rounded-lg">
            {/* graph 2 */}
            <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 pr-6 select-none">
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
          </div>
        </div>
        <div className="flex h-2/5 gap-6 pr-10 ">
          <div className="flex h-full w-2/6 bg-[#1a1733] border border-gray-700 rounded-lg">
            {/* graph 3 */}
            <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 pr-6 select-none">
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
          <div className="flex h-full w-2/6 bg-[#1a1733] border border-gray-700 rounded-lg"></div>
          <div className="flex h-full w-2/6 bg-[#1a1733] border border-gray-700 rounded-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
