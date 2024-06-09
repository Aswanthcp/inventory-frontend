import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getProducts } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";

import "../../styles/product.css";

const Products = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="product-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <div>
            <TableComponent url={getProducts} name="Product" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
