import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PageNotFound from "../pages/PageNotFound";
import Protected from "./Protected";
import "react-toastify/dist/ReactToastify.css";
import Statistics from "../pages/Statistics";
import Settings from "../pages/Settings";
import Extras from "../pages/Extras";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Sidebar from "./Sidebar";
import { navigation } from "../constants/navigation";
import Offers from "../pages/Offers";

const AdminWrapper = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex bg-[#0b0d10] w-full pt-8 h-full max-sm:pt-3">
        {/* side bar */}
        <div className="w-[18%]  py-4 px-8 pr-4 max-sm:hidden">
          <Sidebar navigation={navigation} selected={pathname.split("/")[1]} />
        </div>
        {/* Main */}
        <div className="flex flex-col w-[82%] py-2 px-4 h-auto max-sm:w-full max-sm:px-0">
          {/* Everything will render/change here */}
          <Routes>
            <Route exact path="/" element={<Protected Component={Home} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/statistics"
              element={<Protected Component={Statistics} />}
            />
            <Route
              exact
              path="/settings"
              element={<Protected Component={Settings} />}
            />
            <Route
              exact
              path="/offers"
              element={<Protected Component={Offers} />}
            />
            <Route
              exact
              path="/extras"
              element={<Protected Component={Extras} />}
            />
            <Route
              exact
              path="/products"
              element={<Protected Component={Products} />}
            />
            <Route
              exact
              path="/orders"
              element={<Protected Component={Orders} />}
            />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
