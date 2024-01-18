import bgImg from "../assets/images/404pagebg.gif";
import {Link} from "react-router-dom"
const PageNotFound = () => {
  return (
      <div className="flex h-full w-full overflow-hidden items-center justify-center" style={{backgroundImage : `url(${bgImg})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}}>
        <div className=" sm:w-[600px] max-sm:w-72 flex items-center flex-col gap-4 z-10 backdrop-sepia-0  p-4 font-bold rounded-lg bg-white/50 ">
          <p className="sm:text-md  text-slate-700 tracking-wide">Oops! The page went on a little adventure. Go back to home. </p>
          <Link to="/" className="p-2 px-4 bg-slate-600 rounded-xl text-white ">Home</Link>
        </div>
      </div>
  )
}

export default PageNotFound;
