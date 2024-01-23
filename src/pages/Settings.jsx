import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUserAsync, deleteUserAsync } from "../slices/authSlice";
import { motion } from "framer-motion";
import DeleteModal from "../components/DeleteModal";
import UserAvatar from "../components/UserAvatar";
import MobileSidebar from "../components/MobileSidebar";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passError, setPassError] = useState(false); //show error if password is not matched
  // opening a delete modal to warn user about the delete action
  const [openModal, setOpenModal] = useState(false);
  // handling forminputs here
  const handleUpdate = (data) => {
    if (data.password === data.conf_password) {
      setPassError(false);
      let { password, mobileNo } = data;
      dispatch(updateUserAsync({ id: user._id, data: { password, mobileNo } }));
    } else {
      setPassError(true);
    }
  };

  const deleteUser = () => {
    console.log("user deleted"); // dummy fx to delete user
    dispatch(deleteUserAsync(user._id));
  };

  const [passTogglePwd, setPassTogglePwd] = useState("ri-eye-off-line");
  const [confPassTogglePwd, setConfPassTogglePwd] = useState("ri-eye-off-line");
  const [passType, setPassType] = useState("password");
  const [confPassType, setConfPassType] = useState("password");
  return (
    <>
      {/* navbar */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex  items-center justify-between mb-3 w-full max-sm:px-3"
      >
        <div className="max-sm:text-3xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
          <MobileSidebar /> Settings
        </div>
        {/* User Avatar */}
        <UserAvatar
          userDropDown={userDropDown}
          toggleUserDropDown={toggleUserDropDown}
        />
      </div>
      {/* content */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto max-sm:mt-0  mt-2 mb-7  max-sm:w-full max-sm:px-3"
      >
        <h1 className="text-xl max-sm:text-lg text-white font-bold my-6 max-sm:my-2 max-sm:mb-5">
          General
        </h1>
        <form onSubmit={handleSubmit(handleUpdate)} className="max-sm:w-full">
          <div className="flex max-sm:flex-col w-full sm:gap-32 gap-5">
            <div className="flex flex-col gap-5 justify-center">
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="max-sm:p-3  p-2 px-5 bg-[#181818] border rounded-lg outline-none sm:text-sm text-white border-gray-500 pointer-events-none"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Enter email"
                />
              </div>
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="max-sm:p-3 p-2 px-5 bg-[#181818] sm:text-sm border rounded-lg text-white outline-none border-gray-500 pointer-events-none"
                  type="text"
                  defaultValue={user?.username}
                  placeholder="Enter username"
                />
              </div>
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="pass"
                >
                  Password
                </label>
                <div className="flex p-2 max-sm:p-3 bg-[#181818] sm:text-sm text-gray-200 border rounded-lg border-gray-500 max-sm:justify-between">
                  <input
                    className="px-1 bg-transparent max-sm:w-full max-sm:pr-2 outline-none"
                    type={passType}
                    id="pwd"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Enter password",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    - Can contain special characters`,
                      },
                    })}
                  />
                  <i
                    className={`cursor-pointer ${passTogglePwd}`}
                    onClick={(e) => {
                      if (passTogglePwd === "ri-eye-off-line") {
                        setPassTogglePwd("ri-eye-line");
                        setPassType("text");
                      } else {
                        setPassTogglePwd("ri-eye-off-line");
                        setPassType("password");
                      }
                    }}
                  ></i>
                </div>
              </div>
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="confPass"
                >
                  Confirm Password
                </label>
                <div className="flex max-sm:p-3 p-2 bg-[#181818] sm:text-sm text-gray-200 border rounded-lg border-gray-500 max-sm:justify-between">
                  <input
                    className="px-1 max-sm:w-full max-sm:pr-2 bg-transparent outline-none"
                    type={confPassType}
                    id="confPass"
                    placeholder="Confirm password"
                    {...register("conf_password", {
                      required: "Confirm password",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                    - Can contain special characters`,
                      },
                    })}
                  />
                  <i
                    className={`cursor-pointer ${confPassTogglePwd}`}
                    onClick={(e) => {
                      if (confPassTogglePwd === "ri-eye-off-line") {
                        setConfPassTogglePwd("ri-eye-line");
                        setConfPassType("text");
                      } else {
                        setConfPassTogglePwd("ri-eye-off-line");
                        setConfPassType("password");
                      }
                    }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="mobileNo"
                >
                  Mobile No.
                </label>
                <input
                  className="max-sm:p-3 p-2 px-5 bg-[#181818] text-white border rounded-lg outline-none sm:text-sm border-gray-500"
                  type="text"
                  id="mobileNo"
                  defaultValue={user?.mobileNo}
                  placeholder="Enter  Mobile"
                  {...register("mobileNo", {
                    required: "Enter Phone No.",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter valid Phone No.",
                    },
                  })}
                />
              </div>
              {errors.mobileNo && (
                <p className="inline-flex  items-center rounded-md  py-0 text-xs font-medium text-red-700 ">
                  {errors.mobileNo.message}
                </p>
              )}
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="max-sm:p-3 p-2 px-5 bg-[#181818] text-white sm:text-sm border rounded-lg outline-none border-gray-500 pointer-events-none"
                  type="text"
                  id="date"
                  defaultValue={new Date().toLocaleDateString()}
                />
              </div>
              <div className="flex max-sm:flex-col sm:gap-12 max-sm:gap-2 max-sm:w-full  sm:justify-between sm:items-center">
                <label
                  className="text-gray-400 text-lg max-sm:text-sm"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="max-sm:p-3 p-2 px-5 bg-[#181818] text-white sm:text-sm border rounded-lg outline-none border-gray-500 pointer-events-none"
                  type="text"
                  id="location"
                  defaultValue={"India"}
                />
              </div>
            </div>
          </div>
          {/* Form Errros */}
          {(errors.password || errors.conf_password || passError) && (
            <p className="max-sm:mt-5 text-red-400">Errors</p>
          )}
          {errors.password && (
            <p className="flex  items-center rounded-md py-0 sm:text-xs  font-medium text-red-700 ">
              Password:{errors.password.message}
            </p>
          )}
          {errors.conf_password && (
            <p className="flex  items-center rounded-md py-0 sm:text-xs font-medium text-red-700 ">
              Confirm Password:{errors.conf_password.message}
            </p>
          )}
          {passError && (
            <p className="flex  items-center rounded-md py-0 text-xs font-medium text-red-700 ">
              Password does not match
            </p>
          )}
          {/* Buttons */}
          <div className="w-full flex mt-10 justify-between">
            <motion.div
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              className="px-5 text-white font-bold sm:text-sm py-3 bg-[#6C52BD] cursor-pointer rounded-xl max-sm:rounded-md max-sm:py-2 max-sm:px-3"
            >
              <button type="submit">Save Changes</button>
            </motion.div>
          </div>
        </form>
        <hr className="border-t border-gray-800 my-6" />
        <h1 className="text-xl text-white font-bold my-3 max-sm:text-lg">
          Danger Zone
        </h1>
        <p className="w-[40%]  max-sm:w-full  mb-4 text-sm text-gray-500">
          Once you delete your account, there is no going back. You will lose
          all golden opportunities, Please be certain.
        </p>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="bg-red-500 cursor-pointer w-48 max-sm:w-full hover:bg-red-700 font-bold text-white px-5 py-3 text-center rounded-xl text-sm max-sm:rounded-md  max-sm:py-2  max-sm:mb-10 "
        >
          Delete Account
        </button>
      </div>

      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        deleteUser={deleteUser}
      />
    </>
  );
};

export default Settings;
