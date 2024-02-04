import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

const OrdersModal = ({ open, setOpen, id }) => {
  const cancelButtonRef = useRef(null);
  const orders = useSelector((state) => state.order.orders);
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    const getOrderById = () => {
      const foundOrder = orders.find((order) => order._id === id);
      if (foundOrder) {
        setMyOrder(foundOrder);
      }
    };
    getOrderById();
  }, [id, orders]);

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
              <Dialog.Panel className="relative transform rounded-lg bg-[#0B0D10] text-left shadow-xl transition-all sm:my-8 h-[40%] w-[50%] max-sm:w-full max-sm:h-full ">
                {/* Order Detail div */}
                {myOrder ? (
                  <div className="flex justify-center flex-col-reverse w-full rounded-md overflow-hidden h-[50%] items-center">
                    <div className="w-full text-sm text-white">
                      <div className="flex gap-4 text-xl bg-[#5C85E7] p-3">
                        {/* {getOrderById(orders, id)} */}
                        <i
                          onClick={() => setOpen(false)}
                          className="ri-arrow-left-line opacity-55 hover:opacity-100 transition-all cursor-pointer"
                        ></i>{" "}
                        <p>Order Details</p>
                      </div>
                      <div className="flex flex-col max-sm:h-[300px] max-h-[450px] overflow-y-auto my-3 ">
                        <div className="flex gap-4 text-xl justify-between p-6 ">
                          <i
                            onClick={() => setOpen(false)}
                            className="ri-box-3-fill opacity-55 hover:opacity-100 transition-all cursor-pointer text-7xl max-sm:text-4xl"
                          ></i>{" "}
                          <div className="flex flex-col items-end text-md">
                            <div className="flex gap-2 items-center max-sm:text-sm ">
                              <p>Order</p>
                              <p className="font-bold">#{myOrder._id}</p>
                            </div>
                            <div className="flex gap-2 text-xs items-center">
                              <p>Issue Date :</p>
                              <p className="font-bold">
                                {String(
                                  `${String(
                                    new Date(myOrder.placedOn).getDate()
                                  ).padStart(2, "0")}/${String(
                                    new Date(myOrder.placedOn).getMonth() + 1
                                  ).padStart(2, "0")}/${new Date(
                                    myOrder.placedOn
                                  ).getFullYear()}`
                                )}
                              </p>
                            </div>
                            <div className="flex gap-2 text-xs items-center">
                              <p>Status : </p>
                              <p className="font-bold capitalize">
                                {myOrder.status}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* product display div */}
                        <div className="grid grid-cols-3 border border-zinc-900 m-5 py-5 pl-4">
                          <div className="grid gap-4 w-full ">
                            <p className="text-lg font-bold">Product</p>
                            {
                              // console.log(myOrder)
                              myOrder?.cart?.map((item, idx) => (
                                <p
                                  className="max-sm:max-w-[8rem] overflow-ellipsis text-nowrap overflow-hidden"
                                  key={idx}
                                >
                                  {item?.productId?.title}
                                </p>
                              ))
                            }
                            <p className="text-xl font-bold">Total</p>
                          </div>
                          <div className="grid gap-4 w-full place-self-start justify-items-center">
                            <p className="text-lg font-bold">Qty</p>
                            {
                              // console.log(myOrder)
                              myOrder?.cart?.map((item, idx) => (
                                <p key={idx}>{item.quantity}</p>
                              ))
                            }
                          </div>
                          <div className="grid gap-4 w-full place-items-center">
                            <p className="text-lg font-bold">Price</p>
                            {
                              // console.log(myOrder)
                              myOrder?.cart?.map((item, idx) => (
                                <p key={idx}>{item?.productId?.price}</p>
                              ))
                            }
                            <p className="text-xl font-bold">
                              ₹ {myOrder?.totalAmount}
                            </p>
                          </div>
                        </div>
                        {/* delivery to */}
                        <div className="flex flex-col gap-3 px-10">
                          <div className="flex gap-4 text-green-600 text-lg font-bold">
                            <i className="ri-map-pin-line"></i>
                            <p>Delivery to</p>
                          </div>
                          <p>{myOrder?.billingAddress}</p>
                          <div className="flex">
                            <p className="capitalize">
                              {myOrder?.billingState} -{" "}
                            </p>
                            <p>{myOrder?.billingZip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Loading</p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OrdersModal;
