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
import DotBg from "../components/DotBg";
import { motion } from "framer-motion";

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
        className="flex flex-col gap-6 overflow-y-auto max-sm:mt-0  mt-2 mb-7  max-sm:w-full px-3 h-full"
      >
        <div className="grid sm:grid-cols-3 gap-6 sm:pr-10  ">
          <div className="border border-gray-900 relative sm:grid sm:col-span-2 bg-gradient-to-tr from-[#1e2652]  via-[#0a1b30] to-[#0B0D10] h-[325px]  rounded-lg  opacity-75">
            {/* graph 1 */}

            {productsStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className="z-30 relative w-full h-full  overflow-hidden rounded-lg p-2 pt-10 pr-10 select-none">
                <p className="px-2 text-[#5C85E7] absolute top-4 right-6 ">
                  Views per product{" "}
                </p>
                <LineChartComponent
                  data={products}
                  x="title"
                  line="viewCount"
                  stroke="#5C85E7"
                  className="pt-4"
                />
              </motion.div>
            )}
            <DotBg />
          </div>
          <div transition={{ease:"easeIn"}} className="sm:grid sm:col-span-1 h-[325px] bg-[#0e1011] rounded-lg">
            {/* graph 2 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className=" flex flex-col gap-4 w-full h-full sm:w-full overflow-hidden rounded-lg pb-2 pt-5 px-3 select-none opacity-75">
                <p className="px-2 text-[#5C85E7] ">Orders per month </p>
                <SimpleRadarCharts
                  data={bonusMonths}
                  title="month"
                  value="totalOrders"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              </motion.div>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 sm:pr-10 ">
          <div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn"}} className="grid h-[250px] bg-[#0e1011] rounded-lg">
            {/* graph 3 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className=" flex flex-col gap-2 w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pt-5 px-2 select-none opacity-75">
                <p className="px-2 text-[#5C85E7] ">Orders per category </p>
                <SimplePieChart
                  data={commonCategories}
                  title="category"
                  value="totalOrders"
                />
              </motion.div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#0e1011] rounded-lg">
            {/* graph 4 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className="  flex flex-col gap-4 pt-4 w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pr-6 select-none opacity-75">
                <p className="px-4 text-[#5C85E7] ">Orders per State </p>
                <PinBarCharts
                  data={mostCommonLocations}
                  title="location"
                  value="totalOrders"
                />
              </motion.div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#0e1011] rounded-lg">
            {/* graph 5 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className="  flex flex-col gap-4 pt-4 w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pr-8 select-none opacity-75">
                <p className="px-4 text-[#5C85E7] ">Most Ordered Products </p>
                <AreaChartComponent
                  data={mostOrderedProducts}
                  x="title"
                  area="orders"
                  stroke="#5C85E7"
                  fill={"#436fbc"}
                />
              </motion.div>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 sm:pr-10 ">
          <div className="grid h-[250px] bg-[#0e1011] rounded-lg">
            {/* graph 6 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className=" flex flex-col gap-4 pt-4 w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 px-2 select-none opacity-75">
                <p className="px-2 text-[#5C85E7] ">Product ratings </p>
                <LineChartComponent
                  data={products}
                  x="title"
                  line="rating"
                  stroke="#5C85E7"
                />
              </motion.div>
            )}
          </div>
          <div className="grid  h-[250px] bg-[#0e1011] rounded-lg">
            {/* graph 7 */}
            {orderStatus === "loading" ? (
              <div className="w-full h-full rounded-lg overflow-hidden">
                <ContentPlaceholder />
              </div>
            ) : (
              <motion.div initial={{opacity:0}}  animate={{opacity:1}} transition={{ease:"easeIn",duration:0.75}} className=" flex flex-col gap-4 pt-4 w-full h-full max-sm:w-80 overflow-hidden rounded-lg pb-2 pr-6 select-none opacity-75">
                <p className="px-4 text-[#5C85E7] ">
                  Total deliveries per Location{" "}
                </p>
                <LinedBarGraph
                  data={deliveryCount}
                  title="location"
                  value="deliveries"
                />
              </motion.div>
            )}
          </div>
          {/* <div className="grid  h-[250px] bg-[#161517] rounded-lg"></div> */}
        </div>
      </div>
    </>
  );
};

export default Statistics;
