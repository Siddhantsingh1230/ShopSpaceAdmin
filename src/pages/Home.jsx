import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <>
      <button className="p-2 px-3 hover:bg-blue-700 transition-colors rounded-lg m-5 bg-blue-500 text-white" onClick={() => dispatch(logoutAsync())}>logout</button>
    </>
  );
};

export default Home;
