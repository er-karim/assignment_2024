import React from "react";
import { render, screen } from "@testing-library/react";
import CompanyList from "../../components/CompanyList";

describe("CompanyList Component", () => {
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

  it("renders company list correctly", () => {
    render(<CompanyList companies={companies} />);

    companies.forEach((company) => {
      expect(screen.getByText(company.name)).toBeInTheDocument();
      expect(screen.getByText(company.industry)).toBeInTheDocument();
      expect(
        screen.getByText(company.employee_count.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(company.total_deal_amount.toString())
      ).toBeInTheDocument();
    });
  });

  it("renders table headers correctly", () => {
    render(<CompanyList companies={[]} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Industry")).toBeInTheDocument();
    expect(screen.getByText("Employee Count")).toBeInTheDocument();
    expect(screen.getByText("Total Deal Amount")).toBeInTheDocument();
  });
});
