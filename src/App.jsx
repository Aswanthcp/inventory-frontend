import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Category from "./pages/Category/Category";
import Suppliers from "./pages/Suppliers/Suppliers";
import Products from "./pages/Products/Products";
import Varehouse from "./pages/varehouse/Varehouse";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/supplier" element={<Suppliers />} />
          <Route path="/product" element={<Products />} />
          <Route path="/warehouse" element={<Varehouse />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
