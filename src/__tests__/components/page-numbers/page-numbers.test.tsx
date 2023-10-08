import { render, fireEvent, screen } from "@testing-library/react";

import PageNumbers, {
  PageNumbersProps,
} from "../../../components/page-numbers/page-numbers";
import PaginatorContextProvider from "../../../contexts/paginator-context";

const Wrapper = (props: PageNumbersProps) => (
  <PaginatorContextProvider itemsPerPage={1} totalResults={3}>
    <PageNumbers {...props} />
  </PaginatorContextProvider>
);

describe("<PageNumbers />", () => {
  const getButtonPage = (pageNumber: number) =>
    screen.getByRole("button", { name: `mudar para a página ${pageNumber}` });

  it("should render page numbers correctly", () => {
    render(<Wrapper onChangePage={jest.fn()} />);

    expect(getButtonPage(1)).toBeInTheDocument();
    expect(getButtonPage(2)).toBeInTheDocument();
    expect(getButtonPage(3)).toBeInTheDocument();
  });

  it("should apply the selected style to the current page", () => {
    render(<Wrapper onChangePage={jest.fn()} />);

    expect(getButtonPage(1)).toHaveClass("selected");
  });

  it("should call onChangePage when a page button is clicked", () => {
    const onChangePage = jest.fn();
    render(<Wrapper onChangePage={onChangePage} />);

    fireEvent.click(getButtonPage(3));

    expect(onChangePage).toHaveBeenCalledWith(3);
  });
});
