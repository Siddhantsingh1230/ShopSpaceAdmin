import { useEffect, useState } from "react";
import UserAvatar from "../components/UserAvatar";
import MobileSidebar from "../components/MobileSidebar";
import Carousel from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { deleteOfferState, getOffersAsync } from "../slices/offersSlice";
import ContentPlaceholder from "../components/ContentPlaceholder";

import OffersModal from "../components/OffersModal";
import AddOfferModal from "../components/AddOfferModal";
import { deleteOffer } from "../api/offers";

const Offers = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAddOfferModal, setOpenAddOfferModal] = useState(false);
  const [offer, setOffer] = useState({});
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const dispatch = useDispatch();
  // Getting offers
  useEffect(() => {
    dispatch(getOffersAsync());
  }, []);

  const offers = useSelector((state) => state.offer.offers);
  const status = useSelector((state) => state.offer.status);
  const [offerImages, setOfferImages] = useState([]);

  useEffect(() => {
    setOfferImages(offers?.map((item) => item.posterImageURL));
  }, [offers]);

  const delete_offer = (id) => {
    dispatch(deleteOfferState(id));
    deleteOffer(id);
  };

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
          <MobileSidebar /> Offers
        </div>
        {/* User Avatar */}
        <div className="flex  gap-5 max-sm:gap-2 justify-end">
          <div
            className="text-gray-300 p-[1.5px] flex justify-center items-center max-sm:text-xs text-sm rounded-md hover:bg-indigo-500   bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient transition-all max-sm:mb-1"
            onClick={() => setOpenAddOfferModal(true)}
          >
            <div className="w-full h-full gap-2 rounded-md bg-[#0B0D10] p-2 px-4 flex justify-center items-center cursor-pointer">
              <i className="ri-add-fill"></i> <p>Offer</p>
            </div>
          </div>
          <UserAvatar
            userDropDown={userDropDown}
            toggleUserDropDown={toggleUserDropDown}
          />
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto max-sm:mt-0  mt-2 mb-7 h-full max-sm:w-full max-sm:px-3"
      >
        {status === "idle" ? (
          <>
            <Carousel slides={offerImages} />
            <div className="mb-5 w-full">
              <h1 className="text-white font-bold text-xl ">Details</h1>
            </div>
            <div className="flex gap-3 flex-wrap">
              {offers.map((item, key) => (
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setOffer(item);
                  }}
                  key={item._id}
                  title="Click to see details"
                  className="flex justify-center items-center text-xs hover:text-white transition-all cursor-pointer text-gray-300 rounded-full hover:bg-blue-500 bg-[#212121] max-sm:p-1 p-2 px-3 max-sm:px-3"
                >
                  <span className="max-sm:max-w-[5rem] overflow-ellipsis text-nowrap overflow-hidden">
                    {item.posterImageName}
                  </span>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      delete_offer(item._id);
                    }}
                    className="ml-3 text-lg text-white opacity-55 hover:opacity-100 transition-all ri-close-line"
                  ></i>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex gap-5 justify-center items-center h-60 w-full">
            {new Array(4).fill(0).map((_, key) => (
              <div
                key={key}
                className="rounded-lg overflow-hidden max-sm:min-w-full w-full h-full"
              >
                <ContentPlaceholder />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Offers Model */}
      <OffersModal open={openModal} setOpen={setOpenModal} offer={offer} />
      {/* Add Offers Model */}
      <AddOfferModal
        open={openAddOfferModal}
        setOpen={setOpenAddOfferModal}
        offer={offer}
      />
    </>
  );
};

export default Offers;
