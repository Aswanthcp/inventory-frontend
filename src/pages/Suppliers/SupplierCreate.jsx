import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/SupplierForm.css";
import { getSupplier } from "../../utils/constants";
import api from "../../utils/api";

const SupplierCreate = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [name, setName] = useState("");
  const [contact_info, setContact_info] = useState("");

  const createSupplier = (e) => {
    e.preventDefault();
    api
      .post(getSupplier, { name, description }) // Ensure the endpoint is correct
      .then((res) => {
        if (res.status === 201) {
          alert("supplier created");
          navigate("/supplier");
        } else {
          alert("Failed to create supplier.");
        }
      })
      .catch((err) => alert(`Error: ${err.message}`));
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
          <form onSubmit={createSupplier} className="supplier-form">
            <h2>CREATE supplier</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="name">Contact Info:</label>
            <input
              type="text"
              id="contact_info"
              name="contact_info"
              required
              onChange={(e) => setContact_info(e.target.value)}
              value={contact_info}
            />
           
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupplierCreate;
