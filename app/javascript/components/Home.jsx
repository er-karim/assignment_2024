import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

export default () => {
  // List of fetched companies
  const [companies, setCompanies] = useState([]);

  // State for input values and pagination
  const [filters, setFilters] = useState({
    companyName: "",
    industry: "",
    minEmployee: "",
    minimumDealAmount: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce filter input changes
  const debouncedFilterChange = debounce(() => {
    setCurrentPage(1);
    fetchData();
  }, 500);

  // Function to sanitize input data
  const sanitizeInput = (input) => {
    return input.trim();
  };

  const handleInputChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: sanitizeInput(value),
    }));
  };

  // Fetch data from API
  const fetchData = () => {
    const sanitizedCompanyName = sanitizeInput(filters.companyName);
    const sanitizedIndustry = sanitizeInput(filters.industry);
    const sanitizedMinEmployee = sanitizeInput(filters.minEmployee);
    const sanitizedMinimumDealAmount = sanitizeInput(filters.minimumDealAmount);

    const url = `/api/v1/companies?company[name]=${encodeURIComponent(
      sanitizedCompanyName
    )}&company[industry]=${encodeURIComponent(
      sanitizedIndustry
    )}&company[employee_count]=${encodeURIComponent(
      sanitizedMinEmployee
    )}&company[minimum_deal_amount]=${encodeURIComponent(
      sanitizedMinimumDealAmount
    )}&page=${currentPage}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((res) => {
        setCompanies(res.data);
        setTotalPages(res.meta.total_pages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Effect to fetch data when filters change
  useEffect(() => {
    debouncedFilterChange();
    return () => debouncedFilterChange.cancel();
  }, [filters]);

  // Effect to fetch data when page change
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Pagination Links Generation
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
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Companies</h1>

          <label htmlFor="company-name">Company Name</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="company-name"
              value={filters.companyName}
              onChange={(e) =>
                setFilters({ ...filters, companyName: e.target.value })
              }
            />
          </div>

          <label htmlFor="industry">Industry</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="industry"
              value={filters.industry}
              onChange={(e) =>
                setFilters({ ...filters, industry: e.target.value })
              }
            />
          </div>

          <label htmlFor="min-employee">Minimum Employee Count</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="min-employee"
              value={filters.minEmployee}
              onChange={(e) =>
                setFilters({ ...filters, minEmployee: e.target.value })
              }
            />
          </div>

          <label htmlFor="min-amount">Minimum Deal Amount</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="min-amount"
              value={filters.minimumDealAmount}
              onChange={(e) =>
                setFilters({ ...filters, minimumDealAmount: e.target.value })
              }
            />
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Industry</th>
                <th scope="col">Employee Count</th>
                <th scope="col">Total Deal Amount</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.industry}</td>
                  <td>{company.employee_count}</td>
                  <td>{company.total_deal_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
              {paginationLinks}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
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
        </div>
      </div>
    </div>
  );
};
