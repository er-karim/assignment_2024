import React from "react";
import { render, screen, within, fireEvent, act } from "@testing-library/react";
import Home from "../../components/Home";
import { mockFetch } from "../../__mocks__/mock-fetch";

describe("Home Component", () => {
  // Mocking data for testing
  const companies = [
    {
      id: 1,
      name: "Company 1",
      industry: "Tech",
      employee_count: 100,
      total_deal_amount: 1000,
    },
    {
      id: 2,
      name: "Company 2",
      industry: "Finance",
      employee_count: 50,
      total_deal_amount: 600,
    },
  ];

  beforeEach(() => {
    window.fetch = mockFetch({ data: companies, meta: { total_pages: 1 } });
  });

  it("renders without crashing and displays initial input fields", async () => {
    render(<Home />);

    expect(await screen.findByText("Companies")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Industry")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Employee Count")).toBeInTheDocument();
    expect(screen.getByLabelText("Minimum Deal Amount")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument(); // Table header
  });

  it("fetches data with correct filters when input fields are changed", async () => {
    render(<Home />);

    jest.useFakeTimers("modern");

    const companyNameInput = screen.getByTestId("company-name");
    const industryInput = screen.getByTestId("industry");
    const minEmployeeInput = screen.getByTestId("min-employee");
    const minAmountInput = screen.getByTestId("min-amount");

    // Simulate user input
    fireEvent.change(companyNameInput, { target: { value: "Company" } });
    fireEvent.change(industryInput, { target: { value: "Tech" } });
    fireEvent.change(minEmployeeInput, { target: { value: "50" } });
    fireEvent.change(minAmountInput, { target: { value: "500" } });

    // Check if input values are updated
    expect(companyNameInput.value).toBe("Company");
    expect(industryInput.value).toBe("Tech");
    expect(minEmployeeInput.value).toBe("50");
    expect(minAmountInput.value).toBe("500");

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(await screen.findByText("Companies")).toBeInTheDocument();
    expect(screen.queryByText("Company 2")).not.toBeInTheDocument();

    // Check if fetch URL is constructed correctly with updated filters
    const fetchUrl = `/api/v1/companies?company[name]=Company&company[industry]=Tech&company[employee_count]=50&company[minimum_deal_amount]=500&page=1`;
    expect(window.fetch).toHaveBeenCalledWith(fetchUrl);
  });

  it("renders pagination links and fetches data for different pages when clicked", async () => {
    render(<Home />);

    // Wait for initial data to be fetched
    await screen.findByText("Company 1");

    // Check if pagination links are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();

    // Simulate click on pagination link
    fireEvent.click(screen.getByText("1"));

    // Wait for data to be fetched for page 2
    await screen.findByText("Company 1");

    // Check if fetch URL is constructed correctly for page 2
    const fetchUrlPage2 = `/api/v1/companies?company[name]=&company[industry]=&company[employee_count]=&company[minimum_deal_amount]=&page=1`;
    expect(window.fetch).toHaveBeenCalledWith(fetchUrlPage2);
  });

  it("logs error message when fetch fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    window.fetch = mockFetch(Promise.reject(new Error("Failed to fetch data")));

    render(<Home />);

    await screen.findByText("Error fetching data: Failed to fetch data");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching data:",
      new Error("Failed to fetch data")
    );

    consoleErrorSpy.mockRestore();
  });
});
