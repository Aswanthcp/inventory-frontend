import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/WarehouseForm.css";
import { getWarehouse } from "../../utils/constants";
import api from "../../utils/api";

const WarehouseCreate = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!location) newErrors.location = "Contact Info is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createWarehouse = (e) => {
    e.preventDefault();
    if (!validate()) return;

    api
      .post(getWarehouse, { name, location }) // Ensure the endpoint is correct
      .then((res) => {
        if (res.status === 201) {
          alert("warehouse created successfully");
          navigate("/warehouse");
        } else {
          alert("Failed to create warehouse.");
        }
      })
      .catch((err) => alert(`Error: ${err.message}`));
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
          <form onSubmit={createWarehouse} className="warehouse-form">
            <h2>Create warehouse</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <label htmlFor="location">Location:</label>
            <textarea
              id="location"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            ></textarea>
            {errors.location && <p className="error">{errors.location}</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WarehouseCreate;
