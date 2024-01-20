import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify"; // For Toasts
import "react-toastify/dist/ReactToastify.css";
import ResetScroll from "./components/ResetScroll"; // To move the app to the top when route changes
import { useDispatch } from "react-redux";
import { getUserAsync } from "./slices/authSlice";
import { useEffect } from "react";
import Profile from "./pages/Profile";

const App = () => {
  // dispatching getuser to get if user is already signed in or not
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="*" element={<PageNotFound />} />
        
      </Routes>
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
