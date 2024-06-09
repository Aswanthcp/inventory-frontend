import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
const Suppliers = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="home-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          Suppliers
        </div>
      </div>
    </>
  );
};

export default Suppliers;
