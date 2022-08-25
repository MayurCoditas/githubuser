import React from 'react';
import UserCard from "../UserCard/UserCard";
import ReactPaginate from 'react-paginate';
import { useEffect , useState } from 'react';
import './userList.scss'

interface PropType {
  userList:userType[] | null
}

interface userType  {
  login:string,
  id:number

}
const itemsPerPage : number =5
const UserList = ({userList} : PropType) => {

  

  const [currentItems, setCurrentItems] = useState<userType[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  useEffect(() => {
    // Fetch items from another resources.
    if(userList)
    {const endOffset : number = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(userList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userList.length / itemsPerPage));}
  }, [itemOffset , userList]);

  
  const handlePageClick : Function = (e :{selected:number}) => {
    console.log(e)
    if(userList)
    {
      const newOffset : number = (e.selected * itemsPerPage) % userList.length;
      console.log(
        `User requested page number ${e.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);

    }
   
  };

    return(
        <div className='userList-container'>
          <p>Total Results : {userList?userList.length:'0'}</p>
          {currentItems?.map((user,index)=> <UserCard key={user.id} user={user} />)}
          <div className='pagination-container'>
          { <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e :{selected:number})=>handlePageClick(e)}
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
        //renderOnZeroPageCount={null}
      />
          }

          </div>
          

        </div>
    )
}

export default UserList;

