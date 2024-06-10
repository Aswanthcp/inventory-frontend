import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getProducts } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";

import "../../styles/product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Products = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleAddProduct = () => {
    console.log("Adding a new Product...");
    // Add your logic here to handle adding a new Product
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
            <div className="product-header">
            <h1>PRODUCTS MANAGEMENT</h1>
            <button
              className="add-product-button"
              onClick={handleAddProduct}
            >
              New <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
          </div>
          <div>
            <TableComponent url={getProducts} name="Product" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
