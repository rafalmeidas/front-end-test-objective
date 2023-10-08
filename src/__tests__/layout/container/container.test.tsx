import { render, screen } from "@testing-library/react";
import Router from "react-router-dom";

import Container from "../../../layout/container/container";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<Container />", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it("should render Container component correctly", () => {
    render(<Container />);

    expect(screen.getByAltText("Logo da Objective")).toBeInTheDocument();
    expect(screen.getByText("Rafael Silva")).toBeInTheDocument();
    expect(screen.getByText("Teste de Front-end")).toBeInTheDocument();

    expect(screen.getByTestId("main")).toBeInTheDocument();
  });
});
