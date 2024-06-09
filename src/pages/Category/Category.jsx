import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getCategory } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";

import "../../styles/category.css";

const Category = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="category-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <div>
            <TableComponent url={getCategory} name="Category"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
