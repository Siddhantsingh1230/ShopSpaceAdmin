import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import Stars from "./Stars";

const ProductModal = ({ open, setOpen, id }) => {
  const cancelButtonRef = useRef(null);
  const products = useSelector((state) => state.product.products);
  let productRating = null;
  let productTitle = "";
  const getProductImageById = (products, id) => {
    let result = [];
    products.forEach((product) => {
      if (product._id === id) {
        result.push(product.thumbnail);
        result.push(...product.images);
        productRating = product.rating;
        productTitle = product.title;
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
                <div className="flex justify-center py-5 flex-col-reverse w-full rounded-md overflow-hidden h-[50%] items-center">
                  <Carousel slides={getProductImageById(products, id)} />
                  <div className="w-full text-sm text-white px-5">
                    <div className="flex gap-2">
                      <i
                        onClick={() => setOpen(false)}
                        className="ri-arrow-left-line opacity-55 hover:opacity-100 transition-all cursor-pointer"
                      ></i>{" "}
                      <p>{productTitle}</p>
                    </div>
                    <div className="px-5">
                      <Stars star={Math.round(parseInt(productRating))} />
                    </div>
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
