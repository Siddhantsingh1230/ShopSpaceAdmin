import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./components/Protected";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Protected Component={Home} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
