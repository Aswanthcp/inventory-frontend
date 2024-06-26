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
  const [contactInfo, setContactInfo] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!contactInfo) newErrors.contactInfo = "Contact Info is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createSupplier = (e) => {
    e.preventDefault();
    if (!validate()) return;

    api
      .post(getSupplier, { name, contact_info: contactInfo }) // Ensure the endpoint is correct
      .then((res) => {
        if (res.status === 201) {
          alert("Supplier created successfully");
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
            <h2>Create Supplier</h2>
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
            <label htmlFor="contact_info">Contact Info:</label>
            <input
              type="text"
              id="contact_info"
              name="contact_info"
              required
              onChange={(e) => setContactInfo(e.target.value)}
              value={contactInfo}
            />
            {errors.contactInfo && (
              <p className="error">{errors.contactInfo}</p>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SupplierCreate;
