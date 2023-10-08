import { render, fireEvent, screen } from "@testing-library/react";
import Router from "react-router-dom";

import BackButton from "../../../components/back-button/back-button";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<BackButton />", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
  });

  afterEach(() => jest.clearAllMocks());

  it("should render the back button correctly", () => {
    render(<BackButton />);

    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
  });

  it("should call the navigation function when clicking the button", () => {
    render(<BackButton to="/destination" />);

    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));

    expect(navigate).toHaveBeenCalledWith("/destination");
  });

  it('should use the default destination "/" if no destination is specified', () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
