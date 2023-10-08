import { render, fireEvent, screen } from "@testing-library/react";

import ArrowButton from "../../../components/arrow-button/arrow-button";

describe("<ArrowButton />", () => {
  const onClickMock = jest.fn();

  it("should render the button correctly", () => {
    render(
      <ArrowButton
        isShow
        orientation="left"
        label="Arrow Button"
        onClick={onClickMock}
      />
    );

    expect(
      screen.getByRole("button", { name: /arrow button/i })
    ).toBeInTheDocument();
  });

  it("should call the onClick function when clicking the button", () => {
    render(
      <ArrowButton
        isShow
        orientation="right"
        label="Arrow Button"
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /arrow button/i }));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should correctly render the left arrow", () => {
    render(
      <ArrowButton
        isShow
        orientation="left"
        label="Left Arrow"
        onClick={onClickMock}
      />
    );

    expect(screen.getAllByTestId("orientation")).toHaveLength(1);
    expect(screen.getByTestId("orientation")).toHaveClass("arrow_left");
  });

  it("should correctly render the right arrow", () => {
    render(
      <ArrowButton
        isShow
        orientation="right"
        label="Right Arrow"
        onClick={onClickMock}
      />
    );

    expect(screen.getAllByTestId("orientation")).toHaveLength(1);
    expect(screen.getByTestId("orientation")).toHaveClass("arrow_right");
  });

  it("should correctly render two arrows", () => {
    render(
      <ArrowButton
        isShow
        orientation="left"
        label="Left Arrow"
        onClick={onClickMock}
        isDouble
      />
    );

    expect(screen.getAllByTestId("orientation")).toHaveLength(2);
  });
});
