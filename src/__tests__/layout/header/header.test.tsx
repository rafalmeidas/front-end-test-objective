import { render, fireEvent, screen } from "@testing-library/react";
import Router from "react-router-dom";

import Header from "../../../layout/header/header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<Header />", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it("should render Header component correctly", () => {
    render(<Header />);

    expect(screen.getByAltText("Logo da Objective")).toBeInTheDocument();
    expect(screen.getByText("Rafael Silva")).toBeInTheDocument();
    expect(screen.getByText("Teste de Front-end")).toBeInTheDocument();
  });

  it("should navigate to the home page when logo is clicked", () => {
    render(<Header />);

    fireEvent.click(screen.getByAltText("Logo da Objective"));

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
