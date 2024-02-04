import { useEffect, useState } from "react";
import { getAllDeals, getCurrentDeal } from "../api/dealOfTheDay.js";
import CountDownTimer from "../components/CountDownTimer.jsx";
import Stars from "../components/Stars.jsx";
import ContentPlaceholder from "../components/ContentPlaceholder.jsx";
import DODModal from "./DODModal.jsx";

const DealOfTheDay = () => {
  const [currentDeal, setCurrentDeal] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [allDeals, setAllDeals] = useState([]);
  const [offerDuration, setOfferDuration] = useState();
  const fetchCurrentDeal = async () => {
    try {
      const { deal } = await getCurrentDeal();
      setCurrentDeal(deal);

      setOfferDuration((new Date(deal?.offerDuration) - new Date()) / 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllDeals = async () => {
    try {
      const { deals } = await getAllDeals();
      setAllDeals(deals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentDeal();
    fetchAllDeals();
  }, []);
  return (
    <>
      {allDeals.length > 0 && currentDeal ? (
        <div className="w-full h-full py-2 md:p-5 text-white max-sm:justify-center max-sm:flex-col max-sm:items-center flex max-sm:gap-5 gap-5 rounded-md overflow-hidden">
          {/* img */}
          <div className="w-1/2 h-full max-sm:w-[90%] flex-col rounded-lg flex justify-center items-center  max-sm:px-0 gap-2 max-sm:gap-1 max-sm:flex-col-reverse ">
            <img
              className="w-full max-h-[28rem]  max-sm:max-h-48 rounded-md object-cover"
              src={currentDeal?.productId?.thumbnail}
              alt=""
            />
            <div
              onClick={() => setOpenModal(true)}
              className="w-full  bg-blue-500 transition-all py-2 cursor-pointer  text-center rounded-md mb-2 select-none"
            >
              Add Deal
            </div>
          </div>
          {/* Details */}
          <div className="w-1/2 h-full flex max-sm:w-full flex-col ">
            <div className="w-full flex gap-10 justify-center items-center mb-5">
              {/* Product title */}
              <h1 className="text-xl text-white text-center max-w-60 text-nowrap overflow-hidden text-ellipsis ">
                {currentDeal?.productId?.title}
              </h1>
              {/* Rating/Stars */}
              <Stars
                star={Math.round(parseInt(currentDeal?.productId?.rating || 0))}
              />
            </div>

            {/* Timer */}
            <div className="w-full px-20 max-sm:px-5 mb-10 max-sm:mb-5 ">
              <CountDownTimer seconds={offerDuration || ""} />
            </div>

            <hr className="border-t border-gray-800 mb-5" />
            {/* Product details */}
            <div className="flex  justify-center items-center gap-5 max-sm:mb-5 mb-10">
              <div className="flex flex-col border-r border-[#4d71c5] flex-grow">
                <span className="text-blue-500 text-center max-sm:text-base font-bold text-2xl mb-2">
                  Price
                </span>{" "}
                <span className="text-white text-center font-bold  text-sm flex-grow">
                  ₹ {currentDeal?.productId?.price}
                </span>
              </div>
              <div className="flex flex-col border-r border-[#4d71c5] flex-grow">
                <span className="text-blue-500 text-center max-sm:text-base font-bold text-2xl mb-2">
                  Brand
                </span>{" "}
                <span className="text-white text-center font-bold  text-sm flex-grow">
                  {currentDeal?.productId?.brand}
                </span>
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-blue-500 text-center max-sm:text-base font-bold text-2xl mb-2">
                  Discount
                </span>{" "}
                <span className="text-white text-center font-bold  text-sm flex-grow">
                  {currentDeal?.productId?.discountPercentage}%
                </span>
              </div>
            </div>

            {/* DEAL HiStory */}
            <h1 className="text-gray-500 text-center">History</h1>
            <div className="max-sm:h-14 max-h-56 w-full overflow-y-auto">
              {allDeals.length > 0
                ? allDeals.map((item, key) => (
                    <div
                      key={key}
                      className="border-b py-1 text-gray-500 hover:text-white transition-all cursor-pointer max-sm:px-3 px-6 text-sm border-gray-900 grid grid-cols-4 md:gap-20 max-sm:justify-between  gap-3 "
                    >
                      <span className="flex gap-2 col-span-2">
                        {" "}
                        <span className="text-blue-500">
                          <i className="ri-history-fill"></i>
                        </span>
                        <p className="max-w-36  text-ellipsis overflow-hidden text-nowrap">
                          {item?.productId?.title}
                        </p>
                      </span>
                      <span className="col-span-1">
                        ₹{" "}
                        <span className="text-blue-500">
                          {item?.productId?.price}
                        </span>
                      </span>
                      <span className="col-span-1">
                        <span className="text-blue-500">
                          {item?.productId?.discountPercentage}
                        </span>{" "}
                        %
                      </span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full  text-white max-sm:justify-center max-sm:flex-col max-sm:items-center flex max-sm:gap-5 gap-5 rounded-md overflow-hidden">
          <ContentPlaceholder />
        </div>
      )}

      {/* Add Deal Modal */}
      <DODModal setOpen={setOpenModal} open={openModal} />
    </>
  );
};

export default DealOfTheDay;
