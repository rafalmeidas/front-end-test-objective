import usePaginator from "../../hooks/usePaginator";

import styles from "./page-numbers.module.scss";

export type PageNumbersProps = {
  onChangePage: (page: number) => void;
};

export default function PageNumbers({ onChangePage }: PageNumbersProps) {
  const { pages, currentPage } = usePaginator();

  return (
    <ul className={styles.wrapper_page_numbers}>
      {pages.map((page) => (
        <li key={`page-${page}`}>
          <button
            className={`${styles.buttonPage} ${
              currentPage === page ? styles.selected : styles.unselected
            }`}
            onClick={() => onChangePage(page)}
            aria-label={`mudar para a página ${page}`}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}
