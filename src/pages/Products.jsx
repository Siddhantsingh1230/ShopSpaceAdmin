import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  deleteProductAsync,
  deleteProductState,
  getProductsAsync,
  updateProductAsync,
  updateProductState,
} from "../slices/productsSlice";
import DeleteModal from "../components/DeleteModal";
import MobileSidebar from "../components/MobileSidebar";
import UserAvatar from "../components/UserAvatar";
import ContextMenu from "../components/ContextMenu";
import GraphModal from "../components/GraphModal";
import { graphRenderConstraints } from "../constants/graphConstants.js";
import ProductModal from "../components/ProductModal.jsx";
import { Link } from "react-router-dom";

// ConTextList
const ContextList = ({ onExportCSV, setOpen, closeOther, graphTitle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);
  return (
    <>
      <div
        onClick={onExportCSV}
        className="text-gray-500 select-none  text-sm hover:bg-blue-500 w-full p-2 rounded-md hover:text-white transition-all cursor-pointer"
      >
        <i className="ri-file-chart-line"></i> Export CSV
      </div>
      <hr className="border-t w-full " />
      <div
        onClick={() => {
          if (!graphRenderConstraints[graphTitle].disabled) {
            setOpen(true);
            closeOther();
          }
        }}
        className={`${
          graphRenderConstraints[graphTitle].disabled
            ? " text-gray-300 "
            : " text-gray-500 "
        }  select-none text-sm hover:${
          graphRenderConstraints[graphTitle].disabled ? " " : "bg-blue-500"
        } w-full p-2 rounded-md ${
          graphRenderConstraints[graphTitle].disabled ? "" : "hover:text-white"
        } transition-all cursor-pointer`}
      >
        <i className="ri-bar-chart-2-fill"></i> Show Graph
      </div>
    </>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [graphTitle, setGraphTitle] = useState("");
  const [openGraph, setOpenGraph] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  let updateProductRow = {};
  const deleteProduct = () => {
    dispatch(deleteProductState(productId));
    dispatch(deleteProductAsync(productId));
  };

  // Special Cell FOR Actions
  const actionCellRenderer = (params) => {
    let editingCells = params.api.getEditingCells();
    // checks if the rowIndex matches in at least one of the editing cells
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });
    return (
      <>
        {isCurrentRowEditing ? (
          <div className="flex gap-3 justify-center items-center text-sm h-full">
            <button
              data-action="update"
              className="transition flex items-center justify-center border gap-2  shrink-0 saturate-[110%] border-gray-600  bg-[#0B0D10] text-white  text-xs font-medium p-[0.4rem]  rounded-md "
            >
              <p className="opacity-55 justify-center items-center flex ">
                Save
              </p>
              <i className="hover:opacity-100 text-green-500 transition-all ri-corner-down-left-fill"></i>
            </button>

            <button
              data-action="cancel"
              className="transition flex items-center justify-center border gap-2  shrink-0 saturate-[110%] border-gray-600  bg-[#0B0D10] text-white  text-xs font-medium p-[0.4rem]  rounded-md "
            >
              <p className="opacity-55  justify-center items-center flex ">
                Cancel
              </p>
              <p className="hover:opacity-100 text-red-500 transition-all">
                Esc
              </p>
            </button>
          </div>
        ) : (
          <div className="flex gap-3 justify-center items-center text-sm h-full">
            <button
              className="action-button edit disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-blue-400 bg-[#0B0D10] text-white  text-sm font-medium  rounded-md  "
              onClick={() => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.api.getDisplayedCenterColumns()[7].colId,
                });
              }}
            >
              <i
                data-action="edit"
                className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-blue-400 transition-all ri-pencil-line"
              ></i>
            </button>
            <button
              data-action="delete"
              className=" disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-red-500 bg-[#0B0D10] text-white  text-sm font-medium rounded-md "
              onClick={() => {
                setProductId(params.data._id);
                setOpenModal(true);
              }}
            >
              <i className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-red-500 transition-all ri-delete-bin-line "></i>
            </button>
            <button
              data-action="view"
              className="disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-green-500 bg-[#0B0D10] text-white text-sm font-medium rounded-md "
              onClick={() => {
                setProductId(params.data._id);
                setOpenProductModal(true);
              }}
            >
              <i className="p-1 px-2 h-full w-full opacity-55 hover:opacity-100 hover:text-green-500 transition-all ri-eye-line"></i>
            </button>
          </div>
        )}
      </>
    );
  };
  //  To display product images columns (but not used currently)
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
  // Contxt menu click
  const columnContextClick = (params) => {
    setGraphTitle(params.column.colId);
    setContextMenuVisible(true);
  };

  const onRowEditingStarted = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  };
  const onRowEditingStopped = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true,
    });
  };

  const columnDefs = [
    { field: "_id", headerTooltip: "Product ID", editable: false },
    // { field: "thumbnail", cellRenderer: DisplayImg }, // removed this due to high client side image network request
    {
      field: "title",
      headerTooltip: "Product title",
      valueSetter: (params) => {
        // console.log({
        //   id: params.data._id,
        //   product: { [params.colDef.field]: params.newValue },
        // });
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "description",
      headerTooltip: "Product Description",
      valueSetter: (params) => {
        // console.log({
        //   id: params.data._id,
        //   product: { [params.colDef.field]: params.newValue },
        // });
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "category",
      headerTooltip: "Product category",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "subCategory",
      headerTooltip: "Product subCategory",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //  updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "brand",
      headerTooltip: "Product brand",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //  updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "price",
      headerTooltip: "Product price",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //  updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    { field: "rating", headerTooltip: "Product rating", editable: false },
    // { field: "sale" }, //No use
    {
      field: "stock",
      headerTooltip: "Stock",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //  updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    {
      field: "discountPercentage",
      headerTooltip: "Product discount",
      valueSetter: (params) => {
        // console.log(params.colDef.field, params.newValue);
        // if (updateField) {
        //   dispatch(
        //     updateProductState({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //   dispatch(
        //     updateProductAsync({
        //       id: params.data._id,
        //       product: { [params.colDef.field]: params.newValue },
        //     })
        //   );
        //  updateField= false;
        //   return true;
        // } else {
        //   return false;
        // }
        updateProductRow = {
          ...updateProductRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateProductState({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        dispatch(
          updateProductAsync({
            id: params.data._id,
            product: { ...updateProductRow },
          })
        );
        updateProductRow = {};
        return true;
      },
    },
    { field: "viewCount", headerTooltip: "Product views", editable: false },
    {
      field: "createdAt",
      cellRenderer: DisplayDate,
      headerTooltip: "createdAt",
      editable: false,
    },
    {
      field: "actions",
      headerTooltip: "Actions",
      headerName: "action",
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action",
    },
  ];

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    editable: true,
  }));

  const products = useSelector((state) => state.product.products);

  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };

  // CSV
  const gridRef = useRef();
  const onExportCSV = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  return (
    <>
      {/* navbar */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setContextMenuVisible(false);
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
        <div className="flex  gap-5 max-sm:gap-2 justify-end">
          <Link
            className="text-gray-300 flex justify-center items-center max-sm:mb-1 p-[1.5px] max-sm:text-xs text-sm rounded-md hover:bg-indigo-500   bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 animate-gradient transition-all "
            to="/addProduct"
          >
            <div className="w-full h-full gap-2 rounded-md bg-[#0B0D10]  max-sm:px-2  p-2 px-4 flex justify-center items-center">
              <i className="ri-add-fill"></i> <p>Product</p>
            </div>
          </Link>
          <UserAvatar
            userDropDown={userDropDown}
            toggleUserDropDown={toggleUserDropDown}
          />
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setContextMenuVisible(false);
          if (userDropDown) {
            toggleUserDropDown();
          }
        }}
        className="flex flex-col overflow-y-auto max-sm:mt-0  mt-2 mb-7 h-full max-sm:w-full max-sm:px-3"
      >
        {/* product table */}
        <div
          className="ag-theme-alpine-dark h-full bg-gray-800 "
          onClick={() => {
            if (setContextMenuVisible) {
              setContextMenuVisible(false);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setMouseLocation({ x: e.clientX, y: e.clientY });
          }}
        >
          <AgGridReact
            rowData={products}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            tooltipShowDelay={2000}
            onColumnHeaderContextMenu={columnContextClick}
            tooltipInteraction={true}
            ref={gridRef}
            onRowEditingStopped={onRowEditingStopped}
            onRowEditingStarted={onRowEditingStarted}
            editType="fullRow"
            suppressClickEdit={true}
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
      {/* Context Menu */}
      {contextMenuVisible && (
        <ContextMenu location={mouseLocation}>
          <ContextList
            onExportCSV={onExportCSV}
            setOpen={setOpenGraph}
            closeOther={() => {
              setContextMenuVisible(false);
            }}
            graphTitle={graphTitle}
          />
        </ContextMenu>
      )}
      {/* Graph Modal */}
      <GraphModal
        open={openGraph}
        setOpen={setOpenGraph}
        keyField={graphTitle}
      />
      {/* Product Modal */}
      <ProductModal
        open={openProductModal}
        setOpen={setOpenProductModal}
        id={productId}
      />
    </>
  );
};

export default Products;
