import React from "react";
import { useState } from "react";
import "./Footer.scss";
import { IFooterProps } from "./Footer.types";
import { calculatePagenumbers } from "./Footer.utils";

const Footer: React.FC<IFooterProps> = ({
  currentPage,
  handleCurrentPage,
  pageCount,
}) => {
  const [pageNumbers, setPageNumbers] = useState<Array<number | string>>([
    1,
    2,
    3,
    "....",
    pageCount,
  ]);

  const handleClick: React.MouseEventHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    let newCurrentPage: number = 1;
    switch (target.dataset.value) {
      case ">":
        newCurrentPage = currentPage + 1;
        break;
      case "<":
        newCurrentPage = currentPage - 1;
        break;
      case "...":
        newCurrentPage = currentPage - 2;
        break;
      case "....":
        newCurrentPage = currentPage + 2;
        break;
      default:
        newCurrentPage = Number(target.dataset.value);
    }
    handleCurrentPage(newCurrentPage);
    setPageNumbers(calculatePagenumbers({ newCurrentPage, pageCount }));
  };

  return (
    <div>
      {pageCount ? (
        <div className="pagination-container">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={handleClick}
            data-value={""}
          >
            &lt;
          </button>
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              className={
                page === currentPage ? "current-page-button" : "page-button"
              }
              onClick={handleClick}
              data-value={page}
            >
              {page}
            </button>
          ))}

          <button
            className="page-button"
            disabled={currentPage === pageCount}
            onClick={handleClick}
            data-value={">"}
          >
            &gt;
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
