import React from 'react';
import UserCard from "../UserCard/UserCard";
import { useEffect , useState } from 'react';
import './UserList.scss'
import Footer from '../Footer/Footer';
import sortUsers from "../../utils/sorting";
import Spinner from '../Spinner/Spinner';
import { UserListPropType , userType} from './UserList.types';
import { searchUsers } from '../../services/users';
import { itemsPerPage } from './UserList.constants';

const UserList :React.FC<UserListPropType> = ({sortValue,searchString}) => {

  

  const [currentItems, setCurrentItems] = useState<userType[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [userList, setUserList] = useState<userType[] | null>(null);
  const [currentPage ,setCurrentPage] = useState<number>(1);

  useEffect(()=>{
    setCurrentPage(1)
    setUserList(null)
    setPageCount(0)
    setCurrentItems(null)
  },[searchString])

  useEffect(() => {

    searchUsers(searchString,currentPage,itemsPerPage,setUserList , setPageCount)

  }, [searchString , currentPage]);

  useEffect(() => {
    if (userList) {
      var sortedUserList: userType[] = sortUsers(sortValue, userList);
      setCurrentItems([...sortedUserList]);
    }
  }, [userList ,sortValue]);

  

    return(
        <div className='userList-container'>
          {userList? <div><p className='total-result-heading'>Total Results : {pageCount?pageCount:'0'}</p>
          {currentItems?.map((user,index)=> <UserCard key={user.id} user={user} />)}

        <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} />
          </div> :<Spinner />}
          

        </div>
    )
}



export default UserList;

