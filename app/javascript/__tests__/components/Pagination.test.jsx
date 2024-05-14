import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../../components/Pagination";

describe("Pagination Component", () => {
  const totalPages = 3;
  const setCurrentPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination links correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Check if pagination links are rendered
    for (let i = 1; i <= totalPages; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("calls setCurrentPage with previous page when clicking on Previous button", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Click on Previous button
    const previousButton = screen.getByLabelText("Previous");
    fireEvent.click(previousButton);

    // Check if setCurrentPage is called with previous page
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it("calls setCurrentPage with next page when clicking on Next button", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    // Click on Next button
    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);

    // Check if setCurrentPage is called with next page
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    const prevBtnContainer = screen.getByTestId("prev-btn-container");
    expect(prevBtnContainer).toHaveClass("disabled");
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={totalPages}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    );

    const nextBtnContainer = screen.getByTestId("next-btn-container");
    expect(nextBtnContainer).toHaveClass("disabled");
  });
});
