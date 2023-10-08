import { useContext } from "react";

import { PaginatorContext } from "../contexts/paginator-context";

export default function usePaginator() {
  return useContext(PaginatorContext);
}
