import { motion } from "framer-motion";
import { logoutAsync } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserAvatar = ({ userDropDown, toggleUserDropDown,closeOther=()=>{} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div
        title="User"
        className="relative cursor-pointer rounded-full  max-sm:w-8 max-sm:h-8 w-10 h-10 bg-[#181818] overflow-visible"
      >
        <img
          onClick={(e) => {
            e.stopPropagation();
            toggleUserDropDown();
            closeOther(false);
          }}
          className="w-full  h-full rounded-full"
          src={user?.profileImageURL}
          alt=""
        />
        {/* Dropdown */}
        {userDropDown && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="z-40 rounded-md p-1 py-2 max-sm:hidden absolute top-14 right-0 w-32  bg-white flex gap-1 flex-col "
          >
            <Link
              to="/settings"
              title="settings"
              className="hover:bg-indigo-500 p-2 text-sm rounded-md transition-all hover:text-white"
            >
              <i className="mr-1 ri-settings-line" /> Settings
            </Link>
            <hr className="w-full border-t border-gray-300" />
            <p
              onClick={() => dispatch(logoutAsync())}
              title="logout"
              className="hover:bg-indigo-500 p-2 text-sm rounded-md transition-all hover:text-white"
            >
              <i className="mr-1 ri-logout-circle-r-line"></i> Logout
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default UserAvatar;
