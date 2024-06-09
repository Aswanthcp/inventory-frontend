import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getVarehouse } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";
import "../../styles/Varehouse.css";
const Varehouse = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="varehouse-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <div>
            <TableComponent url={getVarehouse} name="Warehouse" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Varehouse;
