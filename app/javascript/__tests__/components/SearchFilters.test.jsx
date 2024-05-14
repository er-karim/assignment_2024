import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchFilters from "../../components/SearchFilters";

describe("SearchFilters Component", () => {
  const filters = {
    companyName: "",
    industry: "",
    minEmployee: "",
    minimumDealAmount: "",
  };
  const setFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields correctly", () => {
    render(<SearchFilters filters={filters} setFilters={setFilters} />);

    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Industry")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Employee Count")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Deal Amount")).toBeInTheDocument();
  });

  it("updates companyName filter correctly", () => {
    render(<SearchFilters filters={filters} setFilters={setFilters} />);

    const companyNameInput = screen.getByTestId("company-name");
    fireEvent.change(companyNameInput, { target: { value: "Company XYZ" } });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      companyName: "Company XYZ",
    });
  });

  it("updates industry filter correctly", () => {
    render(<SearchFilters filters={filters} setFilters={setFilters} />);

    const industryInput = screen.getByTestId("industry");
    fireEvent.change(industryInput, { target: { value: "Tech" } });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      industry: "Tech",
    });
  });

  it("updates minEmployee filter correctly", () => {
    render(<SearchFilters filters={filters} setFilters={setFilters} />);

    const minEmployeeInput = screen.getByTestId("min-employee");
    fireEvent.change(minEmployeeInput, { target: { value: "50" } });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      minEmployee: "50",
    });
  });

  it("updates minimumDealAmount filter correctly", () => {
    render(<SearchFilters filters={filters} setFilters={setFilters} />);

    const minAmountInput = screen.getByTestId("min-amount");
    fireEvent.change(minAmountInput, { target: { value: "500" } });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      minimumDealAmount: "500",
    });
  });
});
