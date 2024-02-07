import { useState, useEffect } from "react";
import UserAvatar from "../components/UserAvatar";
import MobileSidebar from "../components/MobileSidebar";
import { useSelector, useDispatch } from "react-redux";
import ContentPlaceholder from "../components/ContentPlaceholder";
import LineChartComponent from "../components/charts/LineChartComponent";
import AreaChartComponent from "../components/charts/AreaChartComponent";
import {
  mostCommonCategoryAsync,
  mostCommonLocationAsync,
  deliveryCountsAsync,
  bonusMonthAsync,
} from "../slices/ordersSlice";
import PinBarCharts from "../components/charts/PinBarCharts";
import SimplePieChart from "../components/charts/SimplePieChart";
import LinedBarGraph from "../components/charts/LinedBarGraph";
import SimpleRadarCharts from "../components/charts/SimpleRadarCharts";

const Statistics = () => {
  const products = useSelector((state) => state.product.products);
  const [userDropDown, setUserDropDown] = useState(false);
  const mostOrderedProducts = useSelector(
    (state) => state.product.mostOrderedProducts
  );
  const mostCommonLocations = useSelector(
    (state) => state.order.mostCommonLocations
  );
  const bonusMonths = useSelector((state) => state.order.bonusMonths);
  const deliveryCount = useSelector((state) => state.order.deliveryCount);
  const commonCategories = useSelector((state) => state.order.commonCategory);
  const dispatch = useDispatch();
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const productsStatus = useSelector((state) => state.product.status);
  const orderStatus = useSelector((state) => state.order.status);

  useEffect(() => {
    dispatch(mostCommonLocationAsync());
    dispatch(mostCommonCategoryAsync());
    dispatch(deliveryCountsAsync());
    dispatch(bonusMonthAsync());
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
        <div className="grid grid-cols-3 gap-6 pr-10">
          <div className="grid col-span-2 bg-gradient-to-tr from-[#1e2652]  via-[#141721] to-[#161517] h-[325px]  rounded-lg  opacity-75">
            {/* graph 1 */}

            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80  overflow-hidden rounded-lg p-2 pt-10 pr-10 select-none">
                <LineChartComponent
                  data={products}
                  x="title"
                  line="viewCount"
                  stroke="#5C85E7"
                />
              </div>
            )}
          </div>
          <div className="grid col-span-1 h-[325px] bg-[#161517] rounded-lg">
            {/* graph 2 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 px-3 select-none opacity-75">
                <SimpleRadarCharts
                  data={bonusMonths}
                  title="month"
                  value="totalOrders"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 pr-10 ">
          <div className="grid h-[250px] bg-[#161517] rounded-lg">
            {/* graph 3 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-4 px-2 select-none opacity-75">
                <SimplePieChart
                  data={commonCategories}
                  title="category"
                  value="totalOrders"
                />
              </div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#161517] rounded-lg">
            {/* graph 4 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 pr-6 select-none opacity-75">
                <PinBarCharts
                  data={mostCommonLocations}
                  title="location"
                  value="totalOrders"
                />
              </div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#161517] rounded-lg">
            {/* graph 5 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 pr-8 select-none opacity-75">
                <AreaChartComponent
                  data={mostOrderedProducts}
                  x="title"
                  area="orders"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 pr-10 ">
          <div className="grid h-[250px] bg-[#161517] rounded-lg">
            {/* graph 6 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 px-4 select-none opacity-75">
                <LineChartComponent
                  data={products?.slice(0, 15)}
                  x="title"
                  line="rating"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              </div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#161517] rounded-lg">
            {/* graph 7 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <div className="w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-10 pr-6 select-none opacity-75">
                <LinedBarGraph
                  data={deliveryCount}
                  title="location"
                  value="deliveries"
                />
              </div>
            )}
          </div>
          {/* <div className="grid  h-[250px] bg-[#161517] rounded-lg"></div> */}
        </div>
      </div>
    </>
  );
};

export default Statistics;
