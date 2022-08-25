import React from 'react';
import UserCard from "../UserCard/UserCard";
import ReactPaginate from 'react-paginate';
import { useEffect , useState } from 'react';
import './userList.scss'

const UserList = ({userList}) => {

  interface userType  {
    login:string,
    id:number,
    node_id:string,
    avatar_url:string,
    gravatar_id:string,


}

  const [currentItems, setCurrentItems] = useState<userType[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  useEffect(() => {
    // Fetch items from another resources.
    if(userList)
    {const endOffset = itemOffset + 5;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(userList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userList.length / 5));}
  }, [itemOffset , userList]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * 5) % userList.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

    return(
        <div className='userList-container'>
          {currentItems?.map((user,index)=> <UserCard key={index} user={user} />)}
          { <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
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
        renderOnZeroPageCount={null}
      /> }

        </div>
    )
}

export default UserList;

