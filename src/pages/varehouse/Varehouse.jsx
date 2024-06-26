import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getWarehouse } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";
import "../../styles/Warehouse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Varehouse = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleAddWarehouse = () => {
    navigate("/warehouse/add");
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
            <button
              className="add-warehouse-button"
              onClick={handleAddWarehouse}
            >
              New <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
          </div>
          <div>
            <TableComponent url={getWarehouse} name="Warehouse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Varehouse;
