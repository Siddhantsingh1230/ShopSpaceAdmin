import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getProductsAsync, deleteProductAsync } from "../slices/productsSlice";
import DeleteModal from "../components/DeleteModal";

const Products = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [productId,setProductId] = useState("");

  const deleteProduct = () => {
    dispatch(deleteProductAsync(productId));
  };
  const Action = (p) => {
    return (
      <div className="flex gap-3 justify-center items-center text-sm h-full">
        <button
          className="p-1 px-2 disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-blue-700/75 focus:ring-[#5C85E7] bg-[#5C85E7] text-white hover:bg-blue-700 hover:border-blue-700 text-sm font-medium  rounded-md "
          onClick={() => {
            console.log("edit", p.data._id);
          }}
        >
          <i className="ri-pencil-line mr-2"></i>Edit
        </button>
        <button
          className="p-1 px-2 disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-red-700/75 focus:ring-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 text-sm font-medium rounded-md"
          onClick={() => {
            setProductId(p.data._id)
            setOpenModal(true);
          }}
        >
          <i className="ri-delete-bin-line mr-2"></i>Delete
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
  const columnDefs = [
    { field: "_id" },
    { field: "thumbnail", cellRenderer: DisplayImg },
    { field: "title" },
    { field: "category" },
    { field: "subCategory" },
    { field: "brand" },
    { field: "price" },
    { field: "rating" },
    { field: "sale" },
    { field: "stock" },
    { field: "discountPercentage" },
    { field: "viewCount" },
    { field: "createdAt", cellRenderer: DisplayDate },
    { field: "Actions", cellRenderer: Action },
  ];

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }));

  const products = useSelector((state) => state.product.products);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    dispatch(getProductsAsync);
  },[]);

  useEffect(() => {
    setProductList(products);
  }, [products]);
  return (
    <>
      {/* product table */}
      <div className="ag-theme-alpine-dark h-full bg-gray-800">
        <AgGridReact
          rowData={productList}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
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
