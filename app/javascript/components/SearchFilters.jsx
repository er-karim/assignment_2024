import React from "react";

const SearchFilters = ({ filters, setFilters }) => {
  return (
    <>
      <label htmlFor="company-name">Company Name</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="company-name"
          data-testid="company-name"
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
          data-testid="industry"
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        />
      </div>

      <label htmlFor="min-employee">Minimum Employee Count</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="min-employee"
          data-testid="min-employee"
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
          data-testid="min-amount"
          value={filters.minimumDealAmount}
          onChange={(e) =>
            setFilters({ ...filters, minimumDealAmount: e.target.value })
          }
        />
      </div>
    </>
  );
};

export default SearchFilters;
