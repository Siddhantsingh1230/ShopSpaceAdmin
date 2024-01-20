import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Statistics = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      link: "/",
      icon: "ri-dashboard-line",
    },
    {
      name: "Statistics",
      link: "/",
      icon: "ri-bar-chart-box-line",
    },
    { name: "Chats", link: "/", icon: "ri-chat-3-line" },
    { name: "My Wallet", link: "/", icon: "ri-wallet-line" },
    {
      name: "Transfers",
      link: "/",
      icon: "ri-arrow-up-down-line",
    },
    { name: "Settings", link: "/", icon: "ri-settings-line" },
  ];
  useEffect(() => {
    if (!user) {
      setOpen(true);
    }
  }, []);
  return (
    <>
      {user ? (
        <div className="flex bg-black w-full pt-8 h-screen">
          {/* side bar */}
          <div className=" w-1/5  py-4 px-8 pr-4">
            <Sidebar navigation = {navigation} selected = {"Statistics"} />
          </div>
          <div className="flex flex-col w-full py-2 px-4  h-full text-white">
            hello
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

export default Statistics;
