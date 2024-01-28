import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { addNewOffer } from "../api/offers";
import Toasts from "../app/Toasts";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { getOffersAsync } from "../slices/offersSlice";

const AddOfferModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const reset = () => {
    setImageSelected(null);
    setImageURL("");
    setProductId("");
  };
  const onDrop = useCallback((acceptedFiles) => {
    setImageSelected(acceptedFiles[0]);
    setImageURL(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const addOffer = async () => {
    try {
      if (productId.trim().length > 0) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        // default rating to 1
        formData.append("productId", productId.trim());
        //   To view form Data as u cant view form data directly in console(khushi tips)
        //   for (const key of formData) {
        //     console.log(key);
        //   }
        setLoading(true);
        const data = await addNewOffer(formData);
        // console.log(data);
        setLoading(false);
        dispatch(getOffersAsync());
        Toasts("success", `${data.message}`);
        reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toasts("error", error || "error");
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          reset();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative p-0 transform overflow-hidden rounded-lg bg-[#0B0D10] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                {!loading ? (
                  <>
                    {/* Main div */}
                    <div className="w-full flex justify-center items-center">
                      <div className="w-full relative bg-[#181818] rounded-lg p-6">
                        <div className="text-center">
                          <h3 className="mt-2 text-sm font-medium text-white">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer"
                              {...getRootProps()}
                            >
                              <span>Drag and drop</span>
                              <span className="text-indigo-600">
                                {" "}
                                or browse{" "}
                              </span>
                              <span>to upload</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*"
                                {...getInputProps()}
                              />
                            </label>
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    {imageSelected && (
                      <>
                        <div className="w-full flex justify-center items-center my-10">
                          <img
                            src={imageURL}
                            className="relative z-50 md:w-[80%] w-full h-full  contain"
                            alt=""
                          />
                        </div>
                        <div className="flex ">
                          <input
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full outline-none bg-[#181818] px-3 text-white"
                            type="text"
                            placeholder="Enter ProductID"
                          />
                          <div
                            onClick={addOffer}
                            className=" gap-2  text-white hover:bg-blue-700 bg-blue-500 p-2 px-4 flex justify-center items-center cursor-pointer"
                          >
                            <i className="ri-upload-line"></i>
                            <p>Upload</p>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full py-40">
                    <Spinner />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddOfferModal;
