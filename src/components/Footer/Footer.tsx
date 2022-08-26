import React from "react";
import ReactPaginate from "react-paginate";

interface userType {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

interface FooterPropTypes {
  pageCount: number;
  userList: userType[] | null;
  setItemOffset: Function;
  itemsPerPage: number;
}

const Footer = ({
  pageCount,
  userList,
  setItemOffset,
  itemsPerPage,
}: FooterPropTypes) => {
  return (
    <div>
      <div className="pagination-container">
        {
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e: { selected: number }) =>
              handlePageClick(e, userList, setItemOffset, itemsPerPage)
            }
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={() => null}
          />
        }
      </div>
    </div>
  );
};

const handlePageClick: Function = (
  e: { selected: number },
  userList: userType[] | null,
  setItemOffset: Function,
  itemsPerPage: number
) => {
  console.log(e);
  if (userList) {
    const newOffset: number = (e.selected * itemsPerPage) % userList.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }
};

export default Footer;
