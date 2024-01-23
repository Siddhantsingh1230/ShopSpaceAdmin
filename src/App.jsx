import { ToastContainer } from "react-toastify"; // For Toasts
import "react-toastify/dist/ReactToastify.css";
import ResetScroll from "./components/ResetScroll"; // To move the app to the top when route changes
import { useDispatch } from "react-redux";
import { getUserAsync } from "./slices/authSlice";
import { useEffect } from "react";
import {
  getMostOrderedProductsAsync,
  getProductsAsync,
} from "./slices/productsSlice";
import AdminWrapper from "./components/AdminWrapper";

import "react-modern-drawer/dist/index.css"; // Dependency Styles for drawer

const App = () => {
  // dispatching getuser to get if user is already signed in or not
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
    dispatch(getProductsAsync());
    dispatch(getMostOrderedProductsAsync());
  }, []);
  return (
    <>
      <AdminWrapper />
      {/* Toast container to manage all toasts it act as parent container for toast calls */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Reset Scroll On Route Change so that if user has scroll on other page it is  reset on route change */}
      <ResetScroll />
    </>
  );
};

export default App;
