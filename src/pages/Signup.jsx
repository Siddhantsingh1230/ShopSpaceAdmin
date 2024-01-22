import character2 from "../assets/images/character2.webp";
import heartgif from "../assets/images/heartgif.gif";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// state and dispatch imports
import { signupAsync } from "../slices/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (formData) => {
    const { mobileNo, email, password, username } = formData;
    const sanitizedObject = {
      username: username.trim(),
      mobileNo: parseInt(mobileNo),
      email: email.trim(),
      password,
    };
    dispatch(signupAsync(sanitizedObject));
  };

  // Dispatch
  const dispatch = useDispatch();
  //fetching loading states from store to render Loader
  const status = useSelector((state) => state.auth.status);
  return (
    <>
      <div className="signupWrapper h-full w-full bg-[#111112] max-sm:flex-col flex p-5 max-sm:pt-0 max-sm:gap-0 gap-20 overflow-hidden justify-center items-center">
        {/* Section3(mobile) */}
        <div className="md:hidden w-full flex justify-center items-center">
          <img className="h-8 w-8" src={heartgif} alt="" />
        </div>
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(1px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full max-sm:hidden w-1/2 relative rounded-2xl bg-gradient-to-t from-indigo-300 to-purple-400 overflow-hidden flex justify-center items-center "
        >
          <img className="h-full w-4/5 object-cover " src={character2} alt="" />
        </motion.div>
        {/* Section 2 */}
        <div className=" max-sm:w-full w-1/2 flex flex-col md:justify-center items-center">
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="w-full h-full flex flex-col justify-center items-center max-sm:p-2 max-sm:pt-0 p-20 py-10"
          >
            <h1 className="text-5xl select-none leading-snug text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 font-bold mb-10">
              Signup
            </h1>
            <div className="w-full relative rounded-md mb-5 bg-[#201F25]">
              <input
                className="text-white w-full rounded-md p-3 pr-10 bg-transparent outline-none"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Enter Username",
                  pattern: {
                    value: /[\S\s]+[\S]+/,
                    message: "Enter valid username",
                  },
                })}
              />
              <i className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-white ri-user-3-line"></i>
            </div>
            {errors.username && (
              <p className="rounded-md w-full px-2 pb-5 text-xs font-medium text-red-700 ">
                {errors.username.message}
              </p>
            )}
            <div className="w-full relative rounded-md mb-5 bg-[#201F25]">
              <input
                className="text-white pr-10 w-full rounded-md p-3 bg-transparent outline-none"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Enter email",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Enter valid email",
                  },
                })}
              />
              <i className="absolute  top-1/2 -translate-y-1/2 right-3 cursor-pointer text-white  ri-at-line"></i>
            </div>
            {errors.email && (
              <p className="rounded-md w-full px-2 pb-5 text-xs font-medium text-red-700 ">
                {errors.email.message}
              </p>
            )}
            <div className="relative w-full rounded-md mb-5 bg-[#201F25]">
              <input
                className="w-full rounded-md p-3 bg-transparent pr-10 text-white outline-none"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Enter password",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: `- at least 8 characters
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`,
                  },
                })}
              />
              {!showPass ? (
                <i
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute ri-eye-line top-1/2 -translate-y-1/2 right-3 cursor-pointer text-white"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute ri-eye-off-line top-1/2 -translate-y-1/2 right-3 cursor-pointer text-white"
                ></i>
              )}
            </div>
            {errors.password && (
              <p className=" rounded-md w-full px-2 pb-5 text-xs font-medium text-red-700 ">
                {errors.password.message}
              </p>
            )}
            <div className="relative w-full rounded-md mb-5 bg-[#201F25]">
              <input
                className="w-full  rounded-md p-3 bg-transparent pr-10 text-white outline-none"
                type="text"
                placeholder="Mobile no"
                {...register("mobileNo", {
                  required: "Enter Mobile No.",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter valid Mobile No.",
                  },
                })}
              />
              <i className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-white  ri-phone-fill"></i>
            </div>
            {errors.mobileNo && (
              <p className=" rounded-md w-full px-2 pb-5 text-xs font-medium text-red-700 ">
                {errors.mobileNo.message}
              </p>
            )}
            <button className="hover:bg-[#5162cd] transition-all cursor-pointer w-full rounded-md bg-[#576CEC] p-3 flex justify-center items-center">
              <p className="text-white select-none">
                Commence <i className="ri-eject-line"></i>
              </p>
            </button>
          </form>
          <p className="select-none text-white text-xs max-sm:mt-5">
            Already have an account? <Link
              to="/login"
              className="hover:underline cursor-pointer text-[#576CEC] select-none "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/*  Loader */}
      {status === "loading" ? <Loader /> : null}
    </>
  );
};

export default Signup;
