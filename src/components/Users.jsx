import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUsersAsync } from "../slices/userSlice";

const Users = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
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
    },
  ];
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);
  console.log(users);

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
    </>
  );
};

export default Users;
