import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/TableComponent.css";
import "../styles/CategoryLayout.css"; // Ensure this is correctly imported
import "../styles/ProductLayout.css"; // Ensure this is correctly imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const TableComponent = ({ url, layout ,name}) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    getData();
  }, [url]);

  const getData = async () => {
    try {
      const res = await api.get(url);
      const data = res.data;
      console.log(data);
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
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {isDarkTheme ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </button>
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
              {sortedData.map((item, index) => (
                <tr key={index}>
                  {keys.map((key) => (
                    <td key={key}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
