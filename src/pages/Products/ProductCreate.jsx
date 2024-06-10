import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/ProductForm.css";
import api from "../../utils/api";
import {
  getProducts,
  getCategory,
  getSupplier,
  getWarehouse,
} from "../../utils/constants";

const ProductCreate = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    supplier: "",
    warehouse: "",
    quantity: 0,
    price: 0,
    low_stock_threshold: 10,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchWarehouses();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get(getCategory);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.get(getSupplier);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await api.get(getWarehouse);
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = "Name is required";
    if (!newProduct.category) newErrors.category = "Category is required";
    if (!newProduct.supplier) newErrors.supplier = "Supplier is required";
    if (!newProduct.warehouse) newErrors.warehouse = "Warehouse is required";
    if (!newProduct.quantity) newErrors.quantity = "Quantity is required";
    if (!newProduct.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post(getProducts, newProduct);
      if (res.status === 201) {
        alert("Product created successfully");
        navigate("/product");
        setNewProduct({
          name: "",
          category: "",
          supplier: "",
          warehouse: "",
          quantity: 0,
          price: 0,
          low_stock_threshold: 10,
        });
      } else {
        alert("Failed to create product.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="product-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`content ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          <form onSubmit={createProduct} className="product-form">
            <h2>Add New Product</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="error">{errors.category}</p>}

            <label htmlFor="supplier">Supplier:</label>
            <select
              id="supplier"
              name="supplier"
              value={newProduct.supplier}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {errors.supplier && <p className="error">{errors.supplier}</p>}

            <label htmlFor="warehouse">Warehouse:</label>
            <select
              id="warehouse"
              name="warehouse"
              value={newProduct.warehouse}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
            {errors.warehouse && <p className="error">{errors.warehouse}</p>}

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
            {errors.price && <p className="error">{errors.price}</p>}

            <label htmlFor="low_stock_threshold">Low Stock Threshold:</label>
            <input
              type="number"
              id="low_stock_threshold"
              name="low_stock_threshold"
              value={newProduct.low_stock_threshold}
              onChange={handleInputChange}
            />

            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
