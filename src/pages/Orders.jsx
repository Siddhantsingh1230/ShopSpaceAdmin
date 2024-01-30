import { useSelector, useDispatch } from "react-redux";
import MobileSidebar from "../components/MobileSidebar";
import UserAvatar from "../components/UserAvatar";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  getAllOrdersAsync,
  updateOrderAsync,
  updateOrderState,
} from "../slices/ordersSlice";
import ContextMenu from "../components/ContextMenu";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { graphRenderConstraintsOrders } from "../constants/graphConstants.js";
import GraphModal from "../components/GraphModal";

// ConTextList
const ContextList = ({ onExportCSV, setOpen, closeOther, graphTitle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAsync());
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
          if (!graphRenderConstraintsOrders[graphTitle].disabled) {
            setOpen(true);
            closeOther();
          }
        }}
        className={`${
          graphRenderConstraintsOrders[graphTitle].disabled
            ? " text-gray-300 "
            : " text-gray-500 "
        }  select-none text-sm hover:${
          graphRenderConstraintsOrders[graphTitle].disabled
            ? " "
            : "bg-blue-500"
        } w-full p-2 rounded-md ${
          graphRenderConstraintsOrders[graphTitle].disabled
            ? ""
            : "hover:text-white"
        } transition-all cursor-pointer`}
      >
        <i className="ri-bar-chart-2-fill"></i> Show Graph
      </div>
    </>
  );
};

const Orders = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [graphTitle, setGraphTitle] = useState("");
  const [openGraph, setOpenGraph] = useState(false);
  let updateOrderRow = {};
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

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
          <div className="flex gap-3 justify-center items-center w-full text-sm h-full">
            {params.data.status === "pending" ? (
              <button
                className="flex-1  action-button hover:opacity-100 transition-all hover:text-blue-400 pr-2 edit disabled:opacity-50 inline-flex items-center justify-center space-x-1.5 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 saturate-[110%] border-gray-600 focus:ring-blue-400 bg-[#0B0D10] text-white  text-sm font-medium  rounded-md  "
                onClick={() => {
                  params.api.startEditingCell({
                    rowIndex: params.node.rowIndex,
                    colKey: params.api.getDisplayedCenterColumns()[7].colId,
                  });
                }}
              >
                <i
                  data-action="edit"
                  className="p-1 px-2 h-full opacity-55  ri-pencil-line"
                ></i>
                Edit
              </button>
            ) : null}

            <button
              data-action="view"
              className="flex-1 pr-2  disabled:opacity-50  hover:opacity-100 transition-all hover:text-green-500 inline-flex items-center justify-center border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10  saturate-[110%] border-gray-600 focus:ring-green-500 bg-[#0B0D10] text-white text-sm font-medium rounded-md "
              onClick={() => {
                // setProductId(params.data._id);
                // setOpenProductModal(true);
              }}
            >
              <i className="p-1 px-2 h-full opacity-55 ri-eye-line"></i>
              View
            </button>
          </div>
        )}
      </>
    );
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
  const DisplayDate = (p, x) => {
    return (
      <>
        <p>
          {String(
            `${String(new Date(p.data.placedOn).getDate()).padStart(
              2,
              "0"
            )}/${String(new Date(p.data.placedOn).getMonth() + 1).padStart(
              2,
              "0"
            )}/${new Date(p.data.placedOn).getFullYear()}`
          )}
        </p>
      </>
    );
  };
  const columnDefs = [
    { field: "_id", headerTooltip: "Order ID", editable: false },
    { field: "userId", headerTooltip: "User Id", editable: false },
    { field: "totalAmount", headerTooltip: "Total Amount", editable: false },
    {
      field: "paymentMethod",
      headerTooltip: "Payment Method",
      editable: false,
    },
    { field: "billingState", headerTooltip: "Billing State", editable: false },
    {
      field: "billingAddress",
      headerTooltip: "Billing Address",
      editable: false,
    },
    { field: "billingZip", headerTooltip: "Billing Zip", editable: false },
    {
      field: "checkoutEmail",
      headerTooltip: "Checkout Email",
      editable: false,
    },
    {
      field: "placedOn",
      headerTooltip: "Placed On",
      editable: false,
      cellRenderer: (p) => {
        return (
          <>
            <p>
              {String(
                `${String(new Date(p.data.placedOn).getDate()).padStart(
                  2,
                  "0"
                )}/${String(new Date(p.data.placedOn).getMonth() + 1).padStart(
                  2,
                  "0"
                )}/${new Date(p.data.placedOn).getFullYear()}`
              )}
            </p>
          </>
        );
      },
    },
    {
      field: "deliveredOn",
      headerTooltip: "Delivery Date",
      editable: true,
      cellEditor: 'agDateStringCellEditor',
      cellRenderer: (p) => {
        return (
          <>
            {p.data.status === "shipped" ? (
              <p>
                {String(
                  `${String(new Date(p.data.deliveredOn).getDate()).padStart(
                    2,
                    "0"
                  )}/${String(
                    new Date(p.data.deliveredOn).getMonth() + 1
                  ).padStart(2, "0")}/${new Date(
                    p.data.deliveredOn
                  ).getFullYear()}`
                )}
              </p>
            ) : (
              <p className="ml-10">---</p>
            )}
          </>
        );
      },
      valueSetter: (params) => {
        updateOrderRow = {
          ...updateOrderRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateOrderState({
            id: params.data._id,
            order: { ...updateOrderRow },
          })
        );
        dispatch(
          updateOrderAsync({
            id: params.data._id,
            order: { ...updateOrderRow },
          })
        );
        updateOrderRow = {};
        return true;
      },
    },
    {
      field: "status",
      headerTooltip: "Order Status",
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['shipped','pending'],
    },
      valueSetter: (params) => {
        updateOrderRow = {
          ...updateOrderRow,
          [params.colDef.field]: params.newValue,
        };
        dispatch(
          updateOrderState({
            id: params.data._id,
            order: { ...updateOrderRow },
          })
        );
        dispatch(
          updateOrderAsync({
            id: params.data._id,
            order: { ...updateOrderRow },
          })
        );
        updateOrderRow = {};
        return true;
      },
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

  // Contxt menu click
  const columnContextClick = (params) => {
    setGraphTitle(params.column.colId);
    setContextMenuVisible(true);
  };

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, []);

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
          <MobileSidebar /> Orders
        </div>
        {/* User Avatar */}
        <UserAvatar
          userDropDown={userDropDown}
          toggleUserDropDown={toggleUserDropDown}
        />
      </div>
      {/* orders table */}
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
          rowData={orders}
          columnDefs={columnDefs}
          tooltipInteraction={true}
          editType="fullRow"
          suppressClickEdit={true}
          defaultColDef={defaultColDef}
          tooltipShowDelay={2000}
          onColumnHeaderContextMenu={columnContextClick}
          onRowEditingStopped={onRowEditingStopped}
          onRowEditingStarted={onRowEditingStarted}
          ref={gridRef}
        />
      </div>
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
        data={orders}
        keyField={graphTitle}
        categorical = {graphRenderConstraintsOrders[graphTitle]?.categorical}
      />
    </>
  );
};

export default Orders;
