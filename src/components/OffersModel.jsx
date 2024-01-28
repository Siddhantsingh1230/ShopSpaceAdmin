import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const OffersModel = ({ open, setOpen, offer }) => {
  const cancelButtonRef = useRef(null);

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
              <Dialog.Panel className="relative py-5 transform overflow-hidden rounded-lg bg-[#0B0D10] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                {/* Main div */}
                <div className="px-7 flex justify-between text-white pb-3">
                  <p>Offer</p>
                  {" "}
                  <i
                    onClick={() => setOpen(false)}
                    className="ri-close-line opacity-55 hover:opacity-100 transition-all cursor-pointer"
                  ></i>
                </div>
                <div className="w-full h-auto flex flex-col justify-center  px-7">
                  <h1 className="text-white">
                    <span className="text-blue-600">Published</span> :{" "}
                    {String(
                      `${String(new Date(offer.createdAt).getDate()).padStart(
                        2,
                        "0"
                      )}/${String(
                        new Date(offer.createdAt).getMonth() + 1
                      ).padStart(2, "0")}/${new Date(
                        offer.createdAt
                      ).getFullYear()}`
                    )}
                  </h1>
                  <h1 className="text-white">
                    <span className="text-blue-600">ProductId</span> :{" "}
                    {offer.productId}
                  </h1>
                  <h1 className="text-white">
                    <span className="text-blue-600">Image</span> :{" "}
                    {offer.posterImageName}
                  </h1>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OffersModel;
