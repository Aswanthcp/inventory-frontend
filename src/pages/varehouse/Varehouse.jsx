import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getVarehouse } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";
import "../../styles/Varehouse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Varehouse = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleAddWarehouse = () => {
    console.log("Adding a new supplier...");
    // Add your logic here to handle adding a new supplier
  };

  return (
    <>
      <Navbar />
      <div className="warehouse-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
            <div className="warehouse-header">
            <h1>WAREHOUSE MANAGEMENT</h1>
            <button className="add-warehouse-button" onClick={handleAddWarehouse}>
              New <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
          </div>
          <div>
            <TableComponent url={getVarehouse} name="Warehouse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Varehouse;
