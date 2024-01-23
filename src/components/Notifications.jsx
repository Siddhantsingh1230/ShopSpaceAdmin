import { motion } from "framer-motion";

const Notifications = ({
  notificationDropDown,
  toggleNotificationDropDown,
  closeOther=()=>{},
}) => {
  return (
    <>
      <div
        title="Notification"
        onClick={(e) => {
          e.stopPropagation();
          toggleNotificationDropDown();
          closeOther(false);
        }}
        className="relative cursor-pointer flex justify-center items-center rounded-full w-10 h-10 bg-[#181818]"
      >
        <i className="cursor-pointer text-xl ri-notification-2-line text-white"></i>
        <span className="top-0 right-0 absolute w-2 h-2 bg-red-500 rounded-full"></span>
        {/* Dropdown */}
        {notificationDropDown && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="z-40 rounded-md p-1 py-2  absolute top-14 right-0 w-44  bg-white flex gap-1 flex-col "
          >
            <p
              title="notification"
              className="flex text-gray-800 gap-2 p-2 text-sm rounded-md transition-all items-center"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              Notifications
            </p>
            <hr className="pb-2" />
            <div className="flex flex-col gap-2 w-full p-2">
              <p title="no news" className="text-gray-400 text-xs ">
                <i className="ri-notification-off-fill"></i> No News
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Notifications;
