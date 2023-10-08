/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useMedia from "../hooks/useMedia";

export const PaginatorContext = createContext({
  handleOnChange: (_page: number) => {},
  pages: [] as number[],
  allPages: [] as number[],
  setAllPages: (_pages: number[]) => {},
  totalResults: 0,
  setTotalResults: (_results: number) => {},
  currentPage: 1,
  setCurrentPage: (_currentPage: number) => {},
  itemsPerPage: 10,
  totalPages: 0,
  firstPage: 0,
  lastPage: 0,
});

type PaginatorContextProviderProps = {
  itemsPerPage?: number;
} & PropsWithChildren;

export default function PaginatorContextProvider({
  children,
  itemsPerPage = 10,
}: PaginatorContextProviderProps) {
  const [pages, setPages] = useState<number[]>([]);
  const [allPages, setAllPages] = useState<number[]>([]);

  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { width } = useMedia();

  const length = width >= 768 ? 5 : 3;

  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const firstPage = allPages[0];
  const lastPage = allPages[allPages.length - 1];

  const handleOnChange = useCallback(
    (page: number) => {
      if (page === lastPage) {
        setPages([...allPages].splice(page - length, length));
        return;
      }

      if (!pages.includes(page)) {
        setPages([...allPages].splice(page - 1, length));
      }
    },
    [allPages, lastPage, length, pages]
  );

  useEffect(() => {
    const generatePageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    };

    setAllPages(generatePageNumbers());
  }, [totalPages]);

  useEffect(() => {
    setPages([...allPages].splice(0, length));
  }, [allPages, length]);

  const value = useMemo(
    () => ({
      handleOnChange,
      pages,
      allPages,
      setAllPages,
      totalResults,
      setTotalResults,
      currentPage,
      setCurrentPage,
      itemsPerPage,
      totalPages,
      firstPage,
      lastPage,
    }),
    [
      handleOnChange,
      pages,
      allPages,
      totalResults,
      currentPage,
      itemsPerPage,
      totalPages,
      firstPage,
      lastPage,
    ]
  );

  return (
    <PaginatorContext.Provider value={value}>
      {children}
    </PaginatorContext.Provider>
  );
}
