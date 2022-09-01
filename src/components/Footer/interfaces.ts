export interface IFooterProps {
  currentPage: number;
  handleCurrentPage: (page: number) => void;
  pageCount: number;
}
export interface ICalculatePageNumbersArgs {
  newCurrentPage: number;
  pageCount: number;
}
