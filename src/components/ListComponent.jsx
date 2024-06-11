import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/ListComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";

const ListComponent = ({ supplierId,url }) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("Supplier ID:", supplierId);
  const itemsPerPage = 4;

  useEffect(() => {
    getData();
  }, [supplierId]);

  const getData = async () => {
    try {
      const res = await api.get(`/${url}/${supplierId}/products`);
      const data = res.data;
      if (data.length > 0) {
        const filteredKeys = Object.keys(data[0]).filter((key) => key !== "id");
        setKeys(filteredKeys);
      }
      setData(data);
    } catch (err) {
      console.error(err.message || err);
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
    <>
      <div>
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
                    <td key={key}>
                      {typeof item[key] === "object"
                        ? item[key]["name"]
                        : item[key]}
                    </td>
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
        <div className="theme-toggle-container">
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
      </div>
    </>
  );
};

export default ListComponent;
