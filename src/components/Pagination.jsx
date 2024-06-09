import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <span>&laquo;</span>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          <span>{number}</span>
        </li>
      ))}
      <li
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <span>&raquo;</span>
      </li>
    </ul>
  );
};

export default Pagination;
