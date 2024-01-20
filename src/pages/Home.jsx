import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!user) {
      setOpen(true);
    }
  }, []);
  return (
    <>
      {user ? (
        <div className="flex bg-black w-full p-8">
          {/* side bar */}
          <div className=" w-1/5  py-4 pr-4">
            <p className="font-bold text-white text-xl">SHOP SPACE DESK</p>
            <div className="flex flex-col gap-4 pt-8 text-gray-400 text-lg">
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-dashboard-line"></i>
                <p>Dashboard</p>
              </Link>
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-bar-chart-box-line"></i>
                <p>Statistics</p>
              </Link>
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-chat-3-line"></i>
                <p>Chats</p>
              </Link>
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-wallet-line"></i>
                <p>My Wallet</p>
              </Link>
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-arrow-up-down-line"></i>
                <p>Transfers</p>
              </Link>
              <Link
                className="flex gap-3 p-3 px-5 hover:bg-[#5C85E7] rounded-xl hover:text-white"
                to="/ "
              >
                <i className="ri-settings-line"></i>
                <p>Settings</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full py-2 px-4">
            {/* navbar */}
            <div className="flex justify-between text-white">
              <p className="text-4xl ">Dashboard</p>
              <div className="flex p-3 px-5 bg-[#181818] text-gray-200 gap-3 rounded-lg w-96">
                <i className="ri-search-line cursor-pointer"></i>
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* main content */}
            <div className="flex flex-col">
              {/* card div */}
              <div>
                <div className="flex justify-between text-white font-bold text-2xl mt-8">
                  <p>My cards</p>
                  <i className="ri-add-line cursor-pointer"></i>
                </div>
                {/* cards */}
                <div className="flex mt-6 w-full gap-6">
                  <div className="w-64 h-48 bg-slate-200 rounded-lg"></div>
                  <div className="w-64 h-48 bg-slate-200 rounded-lg"></div>
                  <div className="w-64 h-48 bg-slate-200 rounded-lg"></div>
                  <div className="w-64 h-48 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
              {/* analysis */}
              <div>
                <div className="flex justify-between text-white font-bold  mt-8">
                  <p className="text-2xl">Analysis</p>
                  <Link className="text-[#5C85E7] hover:underline " to={"/"}>Details</Link>
                </div>
                {/* cards */}
                <div className="flex mt-6 w-full gap-6">
                  <div className="w-96 h-64 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
              {/* div carousel */}
              <div>
                <div>
                  <p>Total Bonus</p>
                  <p>+3%</p>
                </div>
              </div>
            </div>
          </div>
          {/* <button
            className="p-2 px-3 hover:bg-blue-700 transition-colors rounded-lg m-5 bg-blue-500 text-white"
            onClick={() => dispatch(logoutAsync())}
          >
            logout
          </button> */}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Home;
