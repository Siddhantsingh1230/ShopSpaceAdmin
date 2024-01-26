import UserAvatar from "../components/UserAvatar.jsx";
import MobileSidebar from "../components/MobileSidebar.jsx";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesAsync } from "../slices/categorySlice.js";
import { useForm } from "react-hook-form";

const AddproductPage = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [thumbnail, setThumbnail] = useState(null);
  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedCategory = watch("category");
  return (
    <>
      {/* navbar */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex  items-center justify-between mb-3 w-full max-sm:px-3"
      >
        <div className="max-sm:text-3xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient select-none">
          <MobileSidebar /> Products
        </div>
        {/* User Avatar */}

        <UserAvatar
          userDropDown={userDropDown}
          toggleUserDropDown={toggleUserDropDown}
        />
      </div>

      {/* form begins */}
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          reset();
        })}
        className="flex flex-col gap-4  overflow-y-auto"
      >
        <div className="flex gap-10 max-sm:gap-4 py-4 px-2 max-sm:flex-col-reverse">

          {/* product image section */}
          <div className="flex  flex-col w-1/3 max-sm:w-full h-fit rounded-md bg-zinc-950 border border-gray-900 overflow-y-auto">
            <p className="text-xl font-bold text-white p-4 px-6">
              Product Image
            </p>
            <hr className="border-gray-900"></hr>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-2">
                <label className=" text-xs text-gray-300">Tag</label>
                <input
                  className="bg-transparent border text-white border-gray-700  p-3 px-4 rounded-md text-xs"
                  type="text"
                  placeholder="Type and enter"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className=" text-xs text-gray-300">Product Image</label>
                <div
                  className="w-full h-[175px] bg-indigo-300 rounded-md flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <label className="cursor-pointer text-xs font-bold bg-indigo-300 rounded-md p-1">
                    {thumbnail ? "Replace Thumbnail" : "Add Thumbnail"}
                    <input
                      type="file"
                      name="img"
                      accept="image/*"
                      className="hidden"
                      placeholder="add new image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Set the thumbnail URL for preview
                          setThumbnail(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                <label className="text-white hover:cursor-pointer hover:bg-indigo-500 hover:border-indigo-600 w-44 mt-3 flex gap-2 hover:font-bold border text-xs rounded-md p-3 px-4 border-gray-700 cursor-pointer">
                  <i className="ri-file-upload-line"></i>Add another image
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    className="hidden"
                    placeholder="add new image"
                    onChange={() => {}}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* general information regarding product */}
          <div className="flex flex-col w-2/3 max-sm:w-full rounded-md border bg-zinc-950 border-gray-900">
            <p className=" text-xl font-bold p-4 px-6  text-white">
              General Information
            </p>
            <hr className="border-gray-900"></hr>
            <div className="flex flex-col gap-6 p-4">
              <div className="flex flex-col gap-2">
                <label className=" text-xs text-gray-300">Product Name</label>
                <input
                  className="bg-transparent border text-white border-gray-700  p-3 px-4 rounded-md text-xs"
                  type="text"
                  placeholder="product name"
                  {...register("title", {
                    required: "Product name is required",
                  })}
                ></input>
              </div>
              <div className="flex  max-sm:flex-col justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">Brand</label>
                  <input
                    className="bg-transparent border text-white border-gray-700 p-3 px-4 rounded-md text-xs"
                    type="text"
                    placeholder="Brand"
                    {...register("brand", {
                      required: "Brand is required",
                    })}
                  ></input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">Category</label>
                  <select
                    type="text"
                    name="category"
                    {...register("category", {
                      required: "Select category",
                    })}
                    className="w-full bg-transparent border text-white border-gray-700 p-3 rounded-md text-xs"
                  >
                    {categories.length > 0 ? (
                      categories.map((elem, idx) => (
                        <option
                          key={idx}
                          value={elem.label}
                          className="bg-black text-white rounded-md text-xs"
                        >
                          {elem.label}
                        </option>
                      ))
                    ) : (
                      <option
                        value=""
                        className="bg-black text-white rounded-md text-xs"
                      >
                        select
                      </option>
                    )}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">Sub category</label>
                  <select
                    type="text"
                    name="subcategory"
                    {...register("subCategory", {
                      required: "Select Subcategory",
                    })}
                    className="w-full bg-transparent border text-white border-gray-700 p-3 rounded-md text-xs"
                  >
                    {selectedCategory ? (
                      categories
                        .find((category) => category.label === selectedCategory)
                        ?.subcategories.map((subcategory, idx) => (
                          <option
                            key={idx}
                            value={subcategory.name}
                            className="bg-black text-white rounded-md text-xs"
                          >
                            {subcategory.name}
                          </option>
                        ))
                    ) : (
                      <option
                        value=""
                        className="bg-black text-white rounded-md text-xs"
                      >
                        select Category
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex max-sm:flex-col justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">Price</label>
                  <input
                    className="bg-transparent border text-white border-gray-700 p-3 px-4 rounded-md text-xs"
                    type="number"
                    placeholder="$ 00.00"
                  ></input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">
                    Discount Percentage
                  </label>
                  <input
                    className="bg-transparent border text-white border-gray-700 p-3 px-4 rounded-md text-xs"
                    type="number"
                    placeholder="00"
                    {...register("discountPercentage", {
                      required: "DiscountPercentage must be between 0 to 90",
                    })}
                  ></input>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className=" text-xs text-gray-300">Stocks</label>
                  <input
                    className="bg-transparent border text-white border-gray-700 p-3 px-4 rounded-md text-xs"
                    type="number"
                    placeholder="00"
                    {...register("stocks", {
                      required: "Required stocks",
                    })}
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                  <label className=" text-xs text-gray-300">
                    Product Description
                  </label>
                  <p className=" text-xs text-gray-600">0/500</p>
                </div>

                <textarea
                  rows="5"
                  cols="50"
                  className="bg-transparent border text-white border-gray-700 p-3 px-4 rounded-md text-xs"
                  placeholder="Description"
                  {...register("description", {
                    required: "Required product description",
                  })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-2 mb-2">
          <button
            type="submit"
            className="text-white cursor-pointer bg-indigo-500 hover:bg-indigo-700 hover:font-bold text-sm px-4 p-2 rounded-md"
          >
            Save Product
          </button>
        </div>
      </form>
    </>
  );
};

export default AddproductPage;
