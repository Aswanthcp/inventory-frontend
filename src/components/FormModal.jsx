import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/FormModal.css";

const FormModal = ({ closeModal, modalData, url,getData }) => {
  const [updatedData, setUpdatedData] = useState({ ...modalData });
  const navigate = useNavigate();
  const handleInputChange = (e, key) => {
    setUpdatedData({
      ...updatedData,
      [key]: e.target.value,
    });
  };
  const excludedKeys = ["id", "created_at", "updated_on"];
  const filteredKeys = Object.keys(modalData).filter(
    (key) => !excludedKeys.includes(key)
  );

  const handleUpdate = () => {
    // Logic to update the data
    api
      .put(`${url}${modalData.id}/`, updatedData)
      .then((res) => {
        if (res.status === 200) {
          alert("Updated successfully");
          closeModal()
          getData()
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
              <label htmlFor={key} className="form-label">
                {key}
              </label>
              <input
                type="text"
                id={key}
                value={updatedData[key]}
                onChange={(e) => handleInputChange(e, key)}
                className="form-input"
              />
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
