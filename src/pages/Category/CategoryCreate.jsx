import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/CategoryForm.css";
import { getCategory } from "../../utils/constants";
import api from "../../utils/api";

const CategoryCreate = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createCategory = (e) => {
    e.preventDefault();
    api
      .post(getCategory, { name, description }) // Ensure the endpoint is correct
      .then((res) => {
        if (res.status === 201) {
          alert("Category created");
          navigate("/category");
        } else {
          alert("Failed to create category.");
        }
      })
      .catch((err) => alert(`Error: ${err.message}`));
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
          <form onSubmit={createCategory} className="category-form">
            <h2>CREATE CATEGORY</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
