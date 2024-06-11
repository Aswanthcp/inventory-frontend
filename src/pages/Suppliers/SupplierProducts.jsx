import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ListComponent from "../../components/ListComponent";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "../../styles/supplier.css";

const SupplierProducts = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(""); // State to store the selected supplier ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    api
      .get("supplier/")
      .then((response) => {
        setSuppliers(response.data);
        // Set default selected supplier as the first supplier
        if (response.data.length > 0) {
          setSelectedSupplierId(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching supplier data: ", error);
      });
  };

  console.log(selectedSupplierId);

  const handleSupplierChange = (e) => {
    setSelectedSupplierId(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
          <div className="supplier-header">
            <h1>SUPPLIERS PRODUCTS MANAGEMENT</h1>
          </div>
          {selectedSupplierId && (
            <>
              <p>Select a supplier:</p>
              <select
                id="warehouse"
                value={selectedSupplierId} // Controlled component
                onChange={handleSupplierChange}
                className="form-select"
                style={{ width: "150px", marginBottom: "10px" }} // Adjust width and position
              >
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <ListComponent url="supplier" supplierId={selectedSupplierId} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SupplierProducts;
