import Spinner from "./Spinner";
// This is full Sized Loader unlike the spinner the component
const Loader = () => {
  return (
    <>
      <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center z-20 bg-[#000000] bg-opacity-75  ">
        <Spinner />
      </div>
    </>
  );
};

export default Loader;
