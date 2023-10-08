import ArrowButton from "../arrow-button/arrow-button";
import PageNumbers from "../page-numbers/page-numbers";
import usePaginator from "../../hooks/usePaginator";

import styles from "./paginator.module.scss";

type PaginatorProps = {
  onChangePage: (page: number) => void;
};

export default function Paginator({ onChangePage }: PaginatorProps) {
  const { currentPage, totalResults, firstPage, lastPage, itemsPerPage } =
    usePaginator();

  const nextPage = () => {
    onChangePage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const canAdvanceOnePage = currentPage * itemsPerPage <= totalResults;
  const canGoBackPage = currentPage !== 1;
  const canAdvanceLastPage = currentPage + 1 < lastPage;
  const canGoBackFirstPage = currentPage > 2;

  return (
    <div className={styles.container_buttons}>
      <ArrowButton
        label="voltar para a primeira página"
        onClick={() => onChangePage(firstPage)}
        orientation="left"
        isDouble
        isShow={canGoBackFirstPage}
      />
      <ArrowButton
        label="voltar uma página"
        onClick={previousPage}
        orientation="left"
        isShow={canGoBackPage}
      />

      <PageNumbers onChangePage={onChangePage} />

      <ArrowButton
        label="avançar uma página"
        onClick={nextPage}
        orientation="right"
        isShow={canAdvanceOnePage}
      />
      <ArrowButton
        label="avançar para a última página"
        onClick={() => onChangePage(lastPage)}
        orientation="right"
        isDouble
        isShow={canAdvanceLastPage}
      />
    </div>
  );
}
