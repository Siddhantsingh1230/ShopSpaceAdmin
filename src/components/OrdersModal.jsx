import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

const OrdersModal = ({ open, setOpen, id }) => {
  const cancelButtonRef = useRef(null);
  const orders = useSelector((state) => state.order.orders);
  console.log(id);
  let ordersId = "";
  let placedOn = "";
  const getOrderById = (orders, id) => {
    orders.forEach((order) => {
      if (order._id === id) {
        ordersId = order._id;
        placedOn = order.placedOn;
      }
    });
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
                {/* Order Detail div */}
                <div className="flex justify-center flex-col-reverse w-full rounded-md overflow-hidden h-[50%] items-center">
                  <div className="w-full text-sm text-white h-[500px]">
                    <div className="flex gap-4 text-xl bg-[#5C85E7] p-3 ">
                      {getOrderById(orders, id)}
                      <i
                        onClick={() => setOpen(false)}
                        className="ri-arrow-left-line opacity-55 hover:opacity-100 transition-all cursor-pointer"
                      ></i>{" "}
                      <p>Order Details</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-4 text-xl justify-between p-6 ">
                        {getOrderById(orders, id)}
                        <i
                          onClick={() => setOpen(false)}
                          className="ri-box-3-fill opacity-55 hover:opacity-100 transition-all cursor-pointer text-7xl"
                        ></i>{" "}
                        <div className="flex flex-col">
                          <div className="flex text-md">
                            <p>Order</p>
                            <p className="font-bold text-sm">#{ordersId}</p>
                          </div>
                          <div className="flex gap-2 text-md items-center">
                            <p>Issue Date</p>
                            <p className="font-bold text-sm">{ordersId}</p>
                          </div>
                        </div>
                      </div>
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

export default OrdersModal;
