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
import CategoryCreate from "./pages/Category/CategoryCreate";
import SupplierCreate from "./pages/Suppliers/SupplierCreate";
import WarehouseCreate from "./pages/varehouse/WarehouseCreate";
import ProductCreate from "./pages/Products/ProductCreate";
import SupplierProducts from "./pages/Suppliers/SupplierProducts";
import WarehouseProducts from "./pages/varehouse/WarehouseProducts";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register/Register";

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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/add"
            element={
              <ProtectedRoute>
                <CategoryCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supplier"
            element={
              <ProtectedRoute>
                <Suppliers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/add"
            element={
              <ProtectedRoute>
                <SupplierCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier/products"
            element={
              <ProtectedRoute>
                <SupplierProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/add/"
            element={
              <ProtectedRoute>
                <ProductCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/warehouse"
            element={
              <ProtectedRoute>
                <Varehouse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/warehouse/add"
            element={
              <ProtectedRoute>
                <WarehouseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/warehouse/products"
            element={
              <ProtectedRoute>
                <WarehouseProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
