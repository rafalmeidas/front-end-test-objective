import { render, fireEvent, screen } from "@testing-library/react";

import Paginator, {
  PaginatorProps,
} from "../../../components/paginator/paginator";
import PaginatorContextProvider from "../../../contexts/paginator-context";

type WrapperProps = {
  currentPage?: number;
} & PaginatorProps;

const Wrapper = (props: WrapperProps) => (
  <PaginatorContextProvider
    itemsPerPage={1}
    totalResults={5}
    currentPage={props.currentPage ?? 1}
    allPages={[1, 2, 3, 4, 5]}
  >
    <Paginator onChangePage={props.onChangePage} />
  </PaginatorContextProvider>
);

describe("<Paginator />", () => {
  const getButton = (name: string) => screen.getByRole("button", { name });

  const getButtonBackFirstPage = () =>
    getButton("voltar para a primeira página");
  const getButtonNextLastPage = () => getButton("avançar para a última página");
  const getButtonBackOnePage = () => getButton("voltar uma página");
  const getButtonNextOnePage = () => getButton("avançar uma página");

  it("should render Paginator component correctly", () => {
    render(<Wrapper onChangePage={jest.fn()} />);

    expect(getButtonBackFirstPage()).toBeInTheDocument();
    expect(getButtonNextLastPage()).toBeInTheDocument();
    expect(getButtonBackOnePage()).toBeInTheDocument();
    expect(getButtonNextOnePage()).toBeInTheDocument();
  });

  it('should call onChangePage when "voltar para a primeira página" button is clicked', () => {
    const onChangePage = jest.fn();
    render(<Wrapper onChangePage={onChangePage} currentPage={4} />);

    fireEvent.click(getButtonBackFirstPage());

    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('should call onChangePage when "voltar uma página" button is clicked', () => {
    const onChangePage = jest.fn();
    render(<Wrapper onChangePage={onChangePage} currentPage={2} />);

    fireEvent.click(getButtonBackOnePage());

    expect(onChangePage).toHaveBeenCalledWith(1);
  });

  it('should call onChangePage when "avançar uma página" button is clicked', () => {
    const onChangePage = jest.fn();
    render(<Wrapper onChangePage={onChangePage} />);

    fireEvent.click(getButtonNextOnePage());

    expect(onChangePage).toHaveBeenCalledWith(2);
  });

  it('should call onChangePage when "avançar para a última página" button is clicked', () => {
    const onChangePage = jest.fn();
    render(<Wrapper onChangePage={onChangePage} />);

    fireEvent.click(getButtonNextLastPage());

    expect(onChangePage).toHaveBeenCalledWith(5);
  });
});
