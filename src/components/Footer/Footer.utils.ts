export const calculatePagenumbers: Function = (
  currentPage: number,
  pageCount: number
) => {
  let pages = [];
  if (currentPage <= 2) {
    pages = [1, 2, 3, "....", pageCount];
  } else if (currentPage >= pageCount - 2) {
    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
  } else {
    pages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "....",
      pageCount,
    ];
  }
  return pages;
};
