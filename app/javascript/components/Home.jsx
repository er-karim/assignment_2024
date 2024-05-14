import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import SearchFilters from "./SearchFilters";
import CompanyList from "./CompanyList";
import Pagination from "./Pagination";
import ErrorAlert from "./ErrorAlert";

export default () => {
  // List of fetched companies
  const [companies, setCompanies] = useState([]);
  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage(`Error fetching data: ${error.message}`);
      });
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

  return (
    <div className="vw-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color" data-testid="home-container">
          <h1 className="display-4">Companies</h1>

          <SearchFilters filters={filters} setFilters={setFilters} />

          <ErrorAlert errorMessage={errorMessage} />

          <CompanyList companies={companies} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
