import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BarChartComponent from "./charts/BarChartComponent";

const GraphModal = ({ open, setOpen, data, keyField, categorical }) => {
  const cancelButtonRef = useRef(null);
  const extractTitleAndKey = (data, keyField) => {
    return data.map((item) => {
      return {
        title: item.title,
        [keyField]: item[keyField],
      };
    });
  };
  const extractCategoricalData = (data, keyField) => {
    return Object.entries(
      data.reduce((counts, item) => {
        const value = item[keyField];
        counts[value] = (counts[value] || 0) + 1;
        return counts;
      }, {})
    ).map(([value, count]) => ({ title: value, count }));
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
              <Dialog.Panel className="relative py-5 transform overflow-hidden rounded-lg bg-[#0B0D10] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                {/* Graph div */}
                <div className="w-full h-96 flex justify-center items-center p-7">
                  <BarChartComponent
                    keyField={!categorical ? keyField : "count"}
                    data={
                      !categorical
                        ? extractTitleAndKey(data, keyField)
                        : extractCategoricalData(data, keyField)
                    }
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default GraphModal;
