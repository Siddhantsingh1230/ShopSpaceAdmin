import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Products = () => {
  const columnDefs = [
    {field : '_id'},
    {field : 'title'},
    {field : 'category'},
    {field : 'subCategory'},
    {field : 'brand'},
    {field : 'price'},
    {field : 'rating'},
    {field : 'sale'},
    {field : 'stock'},
    {field : 'discountPercentage'},
    {field : 'viewCount'},
    {field : 'createdAt'},
  ];

  const defaultColDef = useMemo(()=>({
    sortable : true,
    filter : true,
  }))

  const products = useSelector((state)=>state.product.products);
  return (
    <>
      {/* product table */}
      <div className="ag-theme-alpine-dark h-full">
        <AgGridReact 
        rowData={products}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}/>
      </div>
    </>
  );
};

export default Products;
