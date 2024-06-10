import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getSupplier } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";
import "../../styles/supplier.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Suppliers = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleAddSupplier = () => {
    console.log("Adding a new supplier...");
    // Add your logic here to handle adding a new supplier
  };

  return (
    <>
      <Navbar />
      <div className="supplier-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <div className="supplier-header">
            <h1>SUPPLIERS MANAGEMENT</h1>
            <button className="add-supplier-button" onClick={handleAddSupplier}>
              New <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
          </div>
          <div>
            <TableComponent url={getSupplier} name="Suppliers" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Suppliers;
