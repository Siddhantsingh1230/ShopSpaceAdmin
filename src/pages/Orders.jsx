import { useSelector, useDispatch } from "react-redux";
import MobileSidebar from "../components/MobileSidebar";
import UserAvatar from "../components/UserAvatar";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { getAllOrdersAsync } from "../slices/ordersSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Orders = () => {
  const [userDropDown, setUserDropDown] = useState(false);
  const toggleUserDropDown = () => {
    setUserDropDown((state) => !state);
  };
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

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
      editable: false,
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
    },
    { field: "status", headerTooltip: "Order Status", editable: true },
  ];

  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, []);
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
          // if (setContextMenuVisible) {
          //   setContextMenuVisible(false);
          // }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          // setMouseLocation({ x: e.clientX, y: e.clientY });
        }}
      >
        <AgGridReact
          rowData={orders}
          columnDefs={columnDefs}
          tooltipInteraction={true}
          editType="fullRow"
          suppressClickEdit={true}
        />
      </div>
    </>
  );
};

export default Orders;
