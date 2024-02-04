import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Toasts from "../app/Toasts";
import { addNewDeal } from "../api/dealOfTheDay";
import Spinner from "../components/Spinner";

const DODModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const timerRef = useRef(null);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = useSelector((state) => state.product.products);

  const filterObjectsByIdAndTitle = (inputString) => {
    return products.filter((obj) => {
      // Check if the string is present in either 'title' or 'id' key
      return (
        obj.title.toLowerCase().includes(inputString.toLowerCase()) ||
        obj._id.includes(inputString)
      );
    });
  };
  const handleSave = async () => {
    const offerDuration = timerRef.current.calculateTotalSeconds();
    const productId = selectedProduct._id;
    if (offerDuration !== 0) {
      try {
        setLoading(true);
        const newTime = new Date(new Date().getTime() + offerDuration * 1000);
        const data = await addNewDeal({ productId, offerDuration: newTime });
        Toasts("success", data.message);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          setSearchList([]);
          setSelectedProduct(null);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-[#14171b] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                {/* Main div */}
                <AnimatePresence mode="wait">
                  {!selectedProduct ? (
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0, y: 0 }}
                      key={1}
                      exit={{ x: "-100%" }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                      className="w-full h-96 flex flex-col "
                    >
                      {/* search */}
                      <div className="w-full p-2 py-3 flex gap-3">
                        <i className="ri-search-line text-gray-400 "></i>
                        <input
                          onChange={(e) => {
                            if (e.target.value.trim().length > 0) {
                              setSearchList(
                                filterObjectsByIdAndTitle(e.target.value.trim())
                              );
                            } else {
                              setSearchList([]);
                            }
                          }}
                          className="w-full outline-none bg-transparent  text-gray-400  h-full pr-5"
                          type="text"
                          placeholder="Search product or id"
                        />
                      </div>
                      <hr className="w-full border-t border-gray-600" />
                      {/* Main List */}
                      <div className="w-full flex-1  overflow-hidden overflow-y-auto p-2">
                        {searchList.map((item, key) => (
                          <div
                            key={key}
                            className="w-full flex rounded-md hover:bg-blue-400 transition-all max-w-full text-ellipsis overflow-hidden text-nowrap gap-2 group mb-2  items-center pl-2 cursor-pointer"
                            onClick={() => {
                              setSelectedProduct(item);
                            }}
                          >
                            <div className="w-7  h-7 overflow-hidden rounded-full border border-white">
                              <img
                                src={item.thumbnail}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                            <p className="text-sm text-gray-400 group-hover:text-white p-2 max-sm:w-64 w-50 text-ellipsis overflow-hidden text-nowrap">
                              {item.title}
                            </p>
                            <p className=" text-gray-400 group-hover:text-white p-2 max-sm:hidden w-28 text-xs text-ellipsis overflow-hidden text-nowrap">
                              {item._id}
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* Footer */}
                      <div className="flex w-full py-3 bg-[#000000]">
                        <div className="flex gap-2 px-2 text-white text-xs justify-center items-center">
                          <div className="rounded-md border-gray-500 border flex justify-center items-center p-1   text-gray-400 ">
                            esc
                          </div>
                          to close
                        </div>

                        <div className="flex gap-2 px-2 text-white text-xs justify-center items-center">
                          <div className="rounded-md border-gray-500 border flex justify-center items-center p-1  px-2 text-gray-400 ">
                            <i className="ri-arrow-up-line"></i>
                          </div>
                          <div className="rounded-md border-gray-500 border flex justify-center items-center p-1 px-2   text-gray-400 ">
                            <i className="ri-arrow-down-line"></i>
                          </div>
                          to navigate
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={2}
                      initial={{ x: "100%" }}
                      animate={{ x: 0, y: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="w-full h-96 flex flex-col "
                    >
                      {/* Header */}
                      {!loading ? (
                        <>
                          <div className="w-full flex gap-5 p-2  items-center">
                            <i
                              onClick={() => {
                                setSelectedProduct(null);
                                setSearchList([]);
                              }}
                              className="ri-arrow-left-line text-lg   cursor-pointer text-gray-500 hover:text-white transition-all"
                            ></i>
                            <p className="text-white text-sm max-w-56 text-ellipsis overflow-hidden text-nowrap">
                              {selectedProduct.title}
                            </p>
                          </div>
                          <hr className="w-full border-t border-gray-600" />
                          <div className="w-full  h-full p-2 flex gap-5 flex-col">
                            <div className="w-full h-full">
                              <TimeComponent ref={timerRef} />
                            </div>
                          </div>
                          <div
                            onClick={handleSave}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 text-center select-none text-white cursor-pointer"
                          >
                            Save
                          </div>
                        </>
                      ) : (
                        <Spinner />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const TimeComponent = React.forwardRef((_, ref) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTotalSeconds = () => {
    const timeInSecond =
      parseInt(days | 0) * 24 * 60 * 60 +
      parseInt(hours | 0) * 60 * 60 +
      parseInt(minutes | 0) * 60 +
      parseInt(seconds | 0);
    return timeInSecond;
  };
  // Forward the ref to the div element and expose the childFunction
  React.useImperativeHandle(ref, () => ({
    calculateTotalSeconds,
  }));

  return (
    <>
      <div className="flex space-x-4 w-full h-full justify-center items-center">
        <div className="flex flex-col items-center">
          <input
            type="number"
            value={days}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 15) {
                setDays(e.target.value);
              }
            }}
            className="w-20 h-20 max-sm:w-14 max-sm:h-14 text-center border rounded"
          />
          <span className="text-sm max-sm:text-xs mt-5 text-white">Days</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={hours}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 24) {
                setHours(e.target.value);
              }
            }}
            className="w-20 h-20 max-sm:w-14 max-sm:h-14 text-center border rounded"
          />
          <span className="text-sm max-sm:text-xs mt-5 text-white">Hours</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={minutes}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 9999) {
                setMinutes(e.target.value)
              }
            }}
            className="w-20 h-20 max-sm:w-14 max-sm:h-14 text-center border rounded"
          />
          <span className="text-sm max-sm:text-xs mt-5 text-white">
            Minutes
          </span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="number"
            value={seconds}
            onChange={(e) => {
              if (parseInt(e.target.value) <= 999) {
                setSeconds(e.target.value)
              }
            }}
            className="w-20 h-20 max-sm:w-14 max-sm:h-14 text-center border rounded"
          />
          <span className="text-sm max-sm:text-xs mt-5 text-white">
            Seconds
          </span>
        </div>
      </div>
    </>
  );
});

export default DODModal;
