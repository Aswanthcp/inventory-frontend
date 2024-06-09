import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/TableComponent.css";
import "../styles/CategoryLayout.css";
import "../styles/ProductLayout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const TableComponent = ({ url, layout, name }) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    getData();
  }, [url]);

  const getData = async () => {
    try {
      const res = await api.get(url);
      const data = res.data;
      if (data.length > 0) {
        const filteredKeys = Object.keys(data[0]).filter((key) => key);
        setKeys(filteredKeys);
      }
      setData(data);
    } catch (err) {
      alert(err.message || err);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  return (
    <div
      className={layout === "product" ? "product-layout" : "category-layout"}
    >
      <div className="content">
        <div className="theme-toggle-container">
          <h1>{name}</h1>
          <div className="theme-toggle-button-container">
            <button className="theme-toggle-button" onClick={toggleTheme}>
              {isDarkTheme ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                {keys.map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={
                      sortConfig.key === key
                        ? `sort-${sortConfig.direction}`
                        : ""
                    }
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  {keys.map((key) => (
                    <td key={key}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedData.length / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default TableComponent;
