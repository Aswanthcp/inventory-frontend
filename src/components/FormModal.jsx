import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/FormModal.css";

const FormModal = ({ closeModal, modalData, url, getData }) => {
  const [updatedData, setUpdatedData] = useState({ ...modalData });
  const [warehouses, setWarehouses] = useState([]);
  const handleInputChange = (e, key) => {
    setUpdatedData({
      ...updatedData,
      [key]: e.target.value,
    });
  };
  useEffect(() => {
    // Fetch warehouse data when the component mounts
    fetchWarehouses();
  }, []);
  const excludedKeys = [
    "id",
    "created_at",
    "updated_on",
    "category",
    "supplier",
    "",
  ];
  const filteredKeys = Object.keys(modalData).filter(
    (key) => !excludedKeys.includes(key)
  );

  const fetchWarehouses = () => {
    api
      .get("warehouse/")
      .then((response) => {
        setWarehouses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching warehouse data: ", error);
      });
  };

  const letterFormat = (value) => {
    value =  value.split("_").join(' ');
    return value
  };

  const handleUpdate = () => {
    console.log(updatedData);
    api
      .put(`${url}${modalData.id}/`, updatedData)
      .then((res) => {
        if (res.status === 200) {
          alert("Updated successfully");
          closeModal();
          getData();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2 className="modal-title">Update Data</h2>
        <div className="modal-body">
          {filteredKeys.map((key) => (
            <div key={key}>
              {key !== "warehouse" ? (
                <div>
                  <label htmlFor={key} className="form-label">
                    {letterFormat(key)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    value={updatedData[key]}
                    onChange={(e) => handleInputChange(e, key)}
                    className="form-input"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor={key} className="form-label">
                    {key}
                  </label>
                  <select
                    id="warehouse"
                    value={updatedData.warehouse.id}
                    onChange={(e) => handleInputChange(e, "warehouse")}
                    className="form-select"
                  >
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-close" onClick={closeModal}>
            Close
          </button>
          <button className="btn-save" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
