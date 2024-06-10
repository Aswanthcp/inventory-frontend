import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getCategory } from "../../utils/constants";
import TableComponent from "../../components/TableComponent";

import "../../styles/category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleAddCategory = () => {
    navigate("/category/add");
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
          <div className="category-header">
            <h1>CATEGORY MANAGEMENT</h1>
            <div className="add-category-button" onClick={handleAddCategory}>
              New <FontAwesomeIcon icon={faPlus} className="icon" />
            </div>
          </div>
          <div>
            <TableComponent url={getCategory} name="Category" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
