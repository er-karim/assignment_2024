import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorAlert from "../../components/ErrorAlert";

describe("ErrorAlert Component", () => {
  it("renders error message and close button", () => {
    render(<ErrorAlert errorMessage="An error occurred!" />);

    expect(screen.getByText("An error occurred!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("closes the alert when close button is clicked", () => {
    render(<ErrorAlert errorMessage="An error occurred!" />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(screen.queryByText("An error occurred!")).not.toBeInTheDocument();
  });

  it("does not render if errorMessage is empty", () => {
    render(<ErrorAlert errorMessage="" />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
