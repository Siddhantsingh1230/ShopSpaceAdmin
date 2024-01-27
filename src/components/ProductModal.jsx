import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import Monster from "../assets/images/monster.png";
import Stars from "./Stars";

const ProductModal = ({ open, setOpen, id }) => {
  const cancelButtonRef = useRef(null);
  const products = useSelector((state) => state.product.products);
  let productRating = null;
  const getProductImageById = (products, id) => {
    let result = [];
    products.forEach((product) => {
      if (product._id === id) {
        result.push(product.thumbnail);
        result.push(...product.images);
        productRating = product.rating;
      }
    });
    return result;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#0B0D10] text-left shadow-xl transition-all sm:my-8 h-[40%] w-[50%] max-sm:w-full max-sm:h-full ">
                {/* Product Detail div */}
                <div className="flex justify-center py-10 flex-col w-full rounded-md overflow-hidden h-[50%] items-center">
                  <div className="max-sm:text-3xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
                    Gallery <i className="ri-sketching"></i>
                  </div>
                  <Carousel slides={getProductImageById(products, id)} />
                  <div className="w-full mt-5 flex justify-center items-center">
                    <Stars star={Math.round(parseInt(productRating))} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProductModal;
