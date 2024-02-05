import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const AddModal = ({ open, setOpen, id, addItem }) => {
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");

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
                  <div className="w-full h-full overflow-hidden overflow-y-auto p-5">
                    <h1 className="text-gray-400 mb-5">
                      <i
                        className={`ri-pencil-line ${
                          id == "1"
                            ? "text-[#8F5AF1]"
                            : id == "2"
                            ? "text-[#E5602E]"
                            : "text-[#fc3fe3]"
                        } `}
                      ></i>{" "}
                      Add{" "}
                      {id == "1" ? "Task" : id == "2" ? "Report" : "Backlog"}
                    </h1>
                    <div
                      className={`w-full h-4/5   ${
                        id == "1"
                          ? "text-[#8F5AF1]"
                          : id == "2"
                          ? "text-[#E5602E]"
                          : "text-[#fc3fe3]"
                      } `}
                    >
                      <textarea
                        onChange={(e) => setTitle(e.target.value.trim())}
                        className="w-full h-full outline-none border-none bg-transparent resize-none"
                        defaultValue={"Type here.."}
                      ></textarea>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      if (title) {
                        addItem(id, title);
                        setOpen(false);
                        setTitle("");
                      }
                    }}
                    className={`${
                      id == "1"
                        ? "bg-[#8F5AF1]"
                        : id == "2"
                        ? "bg-[#E5602E]"
                        : "bg-[#fc3fe3]"
                    } w-full text-white cursor-pointer hover:opacity-95 transition-all py-2 text-center select-none`}
                  >
                    Create{" "}
                    {id == "1" ? "Task" : id == "2" ? "Report" : "Backlog"}
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

export default AddModal;
