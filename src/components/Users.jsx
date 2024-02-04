import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsersAsync } from "../slices/userSlice";
import DeleteModal from "./DeleteModal";

const Users = () => {
  const users = useSelector((state) => state.user.users);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  // block user function
  const blockUser = () => {
    console.log("Block User");
  };
  const columnDefs = [
    { field: "_id", headerTooltip: "User ID", editable: false },
    { field: "email", headerTooltip: "Email ID", editable: false },
    { field: "username", headerTooltip: "User Name", editable: false },
    { field: "mobileNo", headerTooltip: "Mobile No.", editable: false },
    { field: "role", headerTooltip: "Role", editable: false },
    {
      field: "createdAt",
      headerTooltip: "Order ID",
      editable: false,
      cellRenderer: (p) => {
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
      },
    },
    {
      field: "actions",
      headerTooltip: "Actions",
      editable: false,
      cellRenderer: (p) => {
        return (
          <>
            {p.data.role === "astro" ? (
              <div className="flex gap-3 justify-center items-center text-sm h-full">
                <p
                  className="border border-gray-600  bg-[#0B0D10] text-gray-400  text-xs font-medium p-2 px-4 rounded-md  "
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  <i className="text-red-500 ri-user-forbid-line pr-2"></i>Block
                  User
                </p>
              </div>
            ) : (
              <div className="flex gap-3 justify-center items-center text-sm h-full">
                <p
                  className="border border-gray-600  bg-[#0B0D10] text-gray-400  text-xs font-medium p-2 px-4 rounded-md  "
                >
                  <i className="text-green-500 ri-admin-line pr-2"></i>Admin{" "}<span className="invisible ">Use</span>
                  
                </p>
              </div>
            )}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  return (
    <>
      {/* users table */}
      <div
        className="ag-theme-alpine-dark h-full"
        onClick={() => {
          // if (setContextMenuVisible) {
          //   setContextMenuVisible(false);
          // }
        }}
        // onContextMenu={(e) => {
        //   e.preventDefault();
        //   setMouseLocation({ x: e.clientX, y: e.clientY });
        // }}
      >
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          // tooltipInteraction={true}
          // editType="fullRow"
          // suppressClickEdit={true}
          // defaultColDef={defaultColDef}
          // tooltipShowDelay={2000}
          // onColumnHeaderContextMenu={columnContextClick}
          // onRowEditingStopped={onRowEditingStopped}
          // onRowEditingStarted={onRowEditingStarted}
          // ref={gridRef}
        />
      </div>
      {/* Context Menu */}
      {/* {contextMenuVisible && (
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
      )} */}
      {/* Graph Modal */}
      {/* <GraphModal
        open={openGraph}
        setOpen={setOpenGraph}
        data={orders}
        keyField={graphTitle}
        categorical = {graphRenderConstraintsOrders[graphTitle]?.categorical}
      /> */}
      {/* Block Modal */}
      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        task="blockUser"
        deleteItem={blockUser}
      />
    </>
  );
};

export default Users;
