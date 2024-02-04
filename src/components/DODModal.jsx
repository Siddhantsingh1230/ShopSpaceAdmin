import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const DODModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [searchList, setSearchList] = useState([]);
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
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: 0, y: 0 }}
                      key={1}
                      exit={{ x: "-100%" }}
                      transition={{
                        duration: .25,
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
                            <div className="w-7 h-7 overflow-hidden rounded-full border border-white">
                              <img
                                src={item.thumbnail}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                            <p className="text-sm text-gray-400 group-hover:text-white p-2 w-50 text-ellipsis overflow-hidden text-nowrap">
                              {item.title}
                            </p>
                            <p className=" text-gray-400 group-hover:text-white p-2 w-30 text-xs text-ellipsis overflow-hidden text-nowrap">
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
                      initial={{ x: 0, y: 0 }}
                      animate={{ x: 0, y: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: .25, ease: "easeInOut" }}
                      className="w-full h-96 flex flex-col "
                    >
                        {/* Header */}
                        <div className="w-full flex gap-2 p-2  items-center">
                        <i className="ri-arrow-left-line text-lg cursor-pointer text-gray-500 hover:text-white transition-all"></i>
                        <p className="text-white text-sm">{selectedProduct.title}</p>
                        </div>
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

export default DODModal;
