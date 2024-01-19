import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!user) {
      setOpen(true);
    }
  }, []);
  return (
    <>
      {user ? (
        <button
          className="p-2 px-3 hover:bg-blue-700 transition-colors rounded-lg m-5 bg-blue-500 text-white"
          onClick={() => dispatch(logoutAsync())}
        >
          logout
        </button>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Home;
