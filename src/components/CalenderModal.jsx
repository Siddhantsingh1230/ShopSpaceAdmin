import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addEvent } from "../api/calender";
import { useSelector } from "react-redux";

const CalenderModal = ({ open, setOpen, setEvents }) => {
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");
  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const getDateObj = (date) => {
    let dateTime = new Date(date);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth(); // Adding 1 since getMonth() returns zero-based index (0-11)
    const day = dateTime.getDate();
    const hour = dateTime.getHours();
    let minute = dateTime.getMinutes();

    return (dateTime = { year, month, day, hour, minute });
  };
  const handleSave = () => {
    if (
      title.trim().length > 0 &&
      sDate != null &&
      eDate != null &&
      sDate !== eDate
    ) {
      const sDateTime = getDateObj(sDate);
      const eDateTime = getDateObj(eDate);
      // console.log(title, eDateTime, sDateTime);
      const eventObj = {
        userId: user._id,
        title,
        start: new Date(
          sDateTime.year,
          sDateTime.month,
          sDateTime.day,
          sDateTime.hour,
          sDateTime.minute
        ),
        end: new Date(
          eDateTime.year,
          eDateTime.month,
          eDateTime.day,
          eDateTime.hour,
          eDateTime.minute
        ),
        createdAt: Date.now(),
      };
      setEvents((prev) => [...prev, { ...eventObj }]);
      addEvent(eventObj);
      setOpen(false);
    }
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
              <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-[#14171b] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                {/* Main div */}
                <div className="h-96 max-sm:h-80 flex flex-col">
                  <div
                    onClick={() => setOpen(false)}
                    className="w-full py-2 px-4 text-gray-400 border-b border-gray-700 "
                  >
                    <i className="opacity-55 hover:opacity-100 transition-all text-lg  cursor-pointer ri-arrow-left-line mr-2"></i>
                    Create Event
                  </div>
                  <div className="w-full h-full p-3">
                    <textarea
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Type here.."
                      className="w-full h-1/3 outline-none bg-transparent resize-none overflow-y-auto text-gray-300"
                    ></textarea>
                    <div className="w-full flex flex-col gap-2 md:gap-5">
                      <div className="w-full flex justify-center flex-col">
                        <h1 className=" text-gray-400 mb-2">From :</h1>
                        <input
                          onChange={(e) => setSDate(e.target.value)}
                          type="datetime-local"
                          className="bg-gray-500  px-2 py-1 rounded-md outline-1    datetimepicker"
                        />
                      </div>
                      <div className="w-full flex justify-center  flex-col mb-2">
                        <h1 className=" text-gray-400">To :</h1>
                        <input
                          onChange={(e) => setEDate(e.target.value)}
                          type="datetime-local"
                          className="bg-gray-500  px-2 py-1 rounded-md outline-1    datetimepicker"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={handleSave}
                    className="w-full py-1 text-center cursor-pointer hover:bg-blue-600 transition-all bg-blue-500  text-white"
                  >
                    Save
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

export default CalenderModal;
