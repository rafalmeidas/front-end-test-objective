import { render, screen } from "@testing-library/react";

import Loader from "../../../components/loader/loader";

describe("<Loader />", () => {
  it("should render the loader", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should apply the correct CSS class to the loader container", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader")).toHaveClass("loaderContainer");
  });
});
