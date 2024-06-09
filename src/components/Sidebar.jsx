import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faHome,
  faUser,
  faSignOutAlt,
  faLayerGroup,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={isOpen ? faAngleDoubleLeft : faAngleDoubleRight}
        />
      </button>
      <hr />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> {isOpen && "Dashboard"}
      </Link>
      <hr />
      <Link to="/category">
        <FontAwesomeIcon icon={faLayerGroup} /> {isOpen && "Category"}
      </Link>
      <hr />
      <Link to="/supplier">
        <FontAwesomeIcon icon={faUser} /> {isOpen && "Supplier"}
      </Link>
      <hr />
      <Link to="/warehouse">
        <FontAwesomeIcon icon={faWarehouse} /> {isOpen && "Warehouse"}
      </Link>
      <hr />
      <Link to="/product">
        <FontAwesomeIcon icon={faProductHunt} /> {isOpen && "Products"}
      </Link>
      <hr />
      <Link to="/logout">
        <FontAwesomeIcon icon={faSignOutAlt} /> {isOpen && "Logout"}
      </Link>
      <hr />
    </div>
  );
};

export default Sidebar;
