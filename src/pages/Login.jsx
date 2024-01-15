import character from "../assets/images/3dlogin.png";
import coin from "../assets/images/3dcoin.png";
import gift from "../assets/images/giftbox.png";
import monster from "../assets/images/monster.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="loginWrapper h-full w-full bg-[#111112] max-sm:flex-col flex p-5 max-sm:pt-0 max-sm:gap-0 gap-20 overflow-hidden">
        <div className="md:hidden ribbon relative h-1/2 w-full flex justify-center items-center">
          <div className="  bg-[#576CEC] w-20 h-full"></div>
          <img className="z-20 bottom-20 opacity-75 absolute w-20 h-20 object-cover" src={monster} alt="" />
        </div>
        {/* Login section1 */}
        <div className="max-sm:w-full h-full w-1/2 flex flex-col  items-center ">
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className=" w-full flex flex-col justify-center items-center max-sm:p-2 max-sm:pt-0 p-20 py-10"
          >
            <h1 className="text-5xl font-bold text-white">Welcome</h1>
            <p className="text-xs mt-2 w-4/5 max-sm:w-full text-center mb-12 text-gray-600">
              Log in to ShopSpace.Access your dashboard to monitor sales, manage
              inventory, and enhance the store.
            </p>
            <div className="w-full rounded-md mb-5 bg-[#201F25]">
              <input
                className="text-white w-full rounded-md p-3 bg-transparent"
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
            </div>
            {errors.email && (
              <p className="rounded-md w-full px-2 pb-5 text-xs font-medium text-red-700 ">
                {errors.email.message}
              </p>
            )}
            <div className="relative w-full rounded-md mb-5 bg-[#201F25]">
              <input
                className="w-full rounded-md p-3 bg-transparent pr-10 text-white "
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
            <button className="hover:bg-[#5162cd] transition-all cursor-pointer w-full rounded-md bg-[#576CEC] p-3 flex justify-center items-center">
              <p className="text-white select-none">
                Get Started <i className="ri-flashlight-fill"></i>
              </p>
            </button>
          </form>
          <p className="select-none text-white text-xs max-sm:mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:underline cursor-pointer text-[#576CEC] select-none "
            >
              Signup
            </Link>
          </p>
        </div>
        {/* Login section2 */}
        <div className="max-sm:hidden h-full w-1/2 relative rounded-2xl bg-gradient-to-b from-orange-100 via-orange-100 to-gray-100 overflow-hidden">
          <img className="h-full w-full object-cover" src={character} alt="" />
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [5, -5], rotateZ: [-5, 5] }}
            transition={{
              duration: 3,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-32  w-32 object-cover absolute top-10 left-20"
            src={gift}
            alt=""
          />

          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [3, -3], rotateZ: [-10, 10] }}
            transition={{
              duration: 3,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-10  blur-[0.5px]  w-10 -rotate-45 object-contain absolute top-2 left-16"
            src={coin}
            alt=""
          />
          <motion.img
            initial={{ y: 0 }}
            animate={{ y: [2, -2], rotateZ: [-10, 10] }}
            transition={{
              duration: 1,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-10    w-10 object-contain  absolute top-12 left-10 "
            src={coin}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
