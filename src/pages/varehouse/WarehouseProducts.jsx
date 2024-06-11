import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import ListComponent from "../../components/ListComponent";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "../../styles/Warehouse.css";

const WarehouseProducts = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [suppliers, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(""); // State to store the selected warehouse ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = () => {
    api
      .get("warehouse/")
      .then((response) => {
        setWarehouses(response.data);
        // Set default selected warehouse as the first warehouse
        if (response.data.length > 0) {
          setSelectedWarehouseId(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching warehouse data: ", error);
      });
  };

  console.log(selectedWarehouseId);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouseId(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
          <div className="warehouse-header">
            <h1>WAREHOUSE PRODUCTS MANAGEMENT</h1>
          </div>
          {selectedWarehouseId && (
            <>
              <p>Select a warehouse:</p>
              <select
                id="warehouse"
                value={selectedWarehouseId} // Controlled component
                onChange={handleWarehouseChange}
                className="form-select"
                style={{ width: "150px", marginBottom: "10px" }} // Adjust width and position
              >
                {suppliers.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
              <ListComponent url="warehouse" supplierId={selectedWarehouseId} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WarehouseProducts;
