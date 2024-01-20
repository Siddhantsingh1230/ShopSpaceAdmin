import bgImg from "../assets/images/404pagespacebg.jpg";
import astronaut from "../assets/images/astronaut.gif";
import { Link } from "react-router-dom";
import notFound from "../assets/images/404png.png";

const PageNotFound = () => {
  return (
    <div
      className="flex h-full w-full max-sm:flex-col overflow-hidden items-center justify-center object-cover object-center"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" sm:w-[600px] max-sm:w-80 flex items-center flex-col gap-4 ">
        <img className="flex w-96 max-sm:w-72 max-sm:h-64 h-72" src={`${notFound}`}></img>
        <p className="sm:text-sm text-white sm:font-bold tracking-wide max-sm:text-center ">
          It seems like the page that you are looking for is no longer here.
        </p>
        <Link to="/" className="p-3 px-10 font-bold text-xs bg-violet-800 rounded-full text-white hover:cursor-pointer">
          TAKE ME HOME
        </Link>
      </div>

      <div
      className="flex w-1/2 h-1/2 max-sm:hidden"
      style={{
        backgroundImage: `url(${astronaut})`,
        backgroundRepeat: "no-repeat",
      }} ></div>
    </div>
  );
};

export default PageNotFound;
