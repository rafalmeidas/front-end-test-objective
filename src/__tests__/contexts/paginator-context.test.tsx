import { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import PaginatorContextProvider from "../../contexts/paginator-context";
import usePaginator from "../../hooks/usePaginator";

const Wrapper = ({ children }: PropsWithChildren) => (
  <PaginatorContextProvider>{children}</PaginatorContextProvider>
);

describe("<PaginatorContextProvider />", () => {
  it('should change the value of the "allPages" state', async () => {
    const { result } = renderHook(() => usePaginator(), {
      wrapper: Wrapper,
    });

    expect(result.current.allPages).toEqual([]);

    await act(async () => {
      result.current.setAllPages([1, 2, 3]);
    });

    expect(result.current.allPages).toEqual([1, 2, 3]);
  });

  it('should change the value of the "totalResults" state', async () => {
    const { result } = renderHook(() => usePaginator(), {
      wrapper: Wrapper,
    });

    expect(result.current.totalResults).toBe(0);

    await act(async () => {
      result.current.setTotalResults(1);
    });

    expect(result.current.totalResults).toBe(1);
  });

  it('should change the value of the "currentPage" state', async () => {
    const { result } = renderHook(() => usePaginator(), {
      wrapper: Wrapper,
    });

    expect(result.current.currentPage).toBe(1);

    await act(async () => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
  });
});
