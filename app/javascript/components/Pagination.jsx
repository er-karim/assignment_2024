import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        {/* Previous Button */}
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          data-testid="prev-btn-container"
        >
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {/* Pagination Links */}
        {paginationLinks}
        {/* Next Button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          data-testid="next-btn-container"
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
