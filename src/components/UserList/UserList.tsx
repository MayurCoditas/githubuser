import React from 'react';
import UserCard from "../UserCard/UserCard";
import { useEffect , useState } from 'react';
import './userList.scss'
import Footer from '../Footer/Footer';

interface PropType {
  userList:userType[] | null
}

interface userType  {
  login:string,
  id:number,
  avatar_url:string,
  html_url:string,
  repos_url:string

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

  
 

    return(
        <div className='userList-container'>
          <p>Total Results : {userList?userList.length:'0'}</p>
          {currentItems?.map((user,index)=> <UserCard key={user.id} user={user} />)}

        <Footer pageCount={pageCount} userList={userList} setItemOffset={setItemOffset} itemsPerPage={itemsPerPage}  />
          

        </div>
    )
}



export default UserList;

