import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { deleteProductAsync } from "../slices/productsSlice";
import DeleteModal from "../components/DeleteModal";
import MobileSidebar from "../components/MobileSidebar";
import UserAvatar from "../components/UserAvatar";

const Products = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");

  const deleteProduct = () => {
    dispatch(deleteProductAsync(productId));
  };
  // Special Cell FOR Actions
  const Action = (p) => {
    return (
      <div className="flex gap-3 justify-center items-center text-sm h-full">
        <button
          className=" disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-blue-400 bg-[#0B0D10] text-white  text-sm font-medium  rounded-md  "
          onClick={() => {
            console.log("edit", p.data._id);
          }}
        >
          <i className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-blue-400 transition-all ri-pencil-line"></i>
        </button>
        <button
          className=" disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-red-500 bg-[#0B0D10] text-white  text-sm font-medium rounded-md "
          onClick={() => {
            setProductId(p.data._id);
            setOpenModal(true);
          }}
        >
          <i className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-red-500 transition-all ri-delete-bin-line "></i>
        </button>
        <button
          className="disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-green-500 bg-[#0B0D10] text-white text-sm font-medium rounded-md "
          onClick={() => {}}
        >
          <i className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-green-500 transition-all ri-eye-line"></i>
        </button>
      </div>
    );
  };

  const DisplayImg = (p) => {
    return (
      <div className="p-2 h-full flex justify-center items-center">
        <img
          className="h-8 w-8 rounded-full"
          src={p.data.thumbnail}
          alt="img"
        />
      </div>
    );
  };
  const DisplayDate = (p) => {
    return (
      <>
        <p>
          {String(
            `${String(new Date(p.data.createdAt).getDate()).padStart(
              2,
              "0"
            )}/${String(new Date(p.data.createdAt).getMonth() + 1).padStart(
              2,
              "0"
            )}/${new Date(p.data.createdAt).getFullYear()}`
          )}
        </p>
      </>
    );
  };
  const columnContextClick = (params) => {
    console.log(params.column.colId);
  };

  const columnDefs = [
    { field: "_id", headerTooltip: "Product ID" },
    // { field: "thumbnail", cellRenderer: DisplayImg }, // removed this due to high client side image network request
    { field: "title", headerTooltip: "Product title" },
    { field: "category", headerTooltip: "Product category" },
    { field: "subCategory", headerTooltip: "Product subCategory" },
    { field: "brand", headerTooltip: "Product brand" },
    { field: "price", headerTooltip: "Product price" },
    { field: "rating", headerTooltip: "Product rating" },
    // { field: "sale" }, //No use
    { field: "stock", headerTooltip: "Stock" },
    { field: "discountPercentage", headerTooltip: "Product discount" },
    { field: "viewCount", headerTooltip: "Product views" },
    {
      field: "createdAt",
      cellRenderer: DisplayDate,
      headerTooltip: "createdAt",
    },
    { field: "Actions", cellRenderer: Action, headerTooltip: "Actions" },
  ];

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  const products = useSelector((state) => state.product.products);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };

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
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto max-sm:mt-0  mt-2 mb-7 h-full max-sm:w-full max-sm:px-3"
      >
        {/* product table */}
        <div className="ag-theme-alpine-dark h-full bg-gray-800 ">
          <AgGridReact
            rowData={productList}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            tooltipShowDelay={2000}
            onColumnHeaderMouseOver={columnContextClick}
            tooltipInteraction={true}
          />
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        task="deleteProduct"
        deleteItem={deleteProduct}
      />
    </>
  );
};

export default Products;
