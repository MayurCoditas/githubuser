import { ICalculatePageNumbersArgs } from "./Footer.types";

export const calculatePagenumbers = ({
  newCurrentPage,
  pageCount,
}: ICalculatePageNumbersArgs): Array<number | string> => {
  let pages: Array<number | string> = [];
  if (newCurrentPage <= 2) {
    pages = [1, 2, 3, "....", pageCount];
  } else if (newCurrentPage >= pageCount - 2) {
    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
  } else {
    pages = [
      1,
      "...",
      newCurrentPage - 1,
      newCurrentPage,
      newCurrentPage + 1,
      "....",
      pageCount,
    ];
  }
  return pages;
};
