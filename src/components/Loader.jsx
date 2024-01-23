import Spinner from "./Spinner";
// This is full Sized Loader unlike the spinner the component
const Loader = () => {
  return (
    <>
      <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center z-50 bg-[#0b0d10]">
        <Spinner />
      </div>
    </>
  );
};

export default Loader;
