import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getSupplier } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";
import "../../styles/supplier.css";

const Suppliers = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="supplier-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
        >
          <div>
            <TableComponent url={getSupplier}  name="Suppliers"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suppliers;
