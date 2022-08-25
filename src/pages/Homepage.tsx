import { useState } from 'react';
import {useEffect} from 'react';
import Navbar from "../components/Navbar/Navbar";
import UserList from "../components/UserList/UserList";
import sortUsers from '../utils/sorting';
import React from 'react';
import './homepage.scss'

const Homepage = () => {

    interface userType  {
        login:string,
        id:number

    }
    const [userList , setUserList] = useState <userType[] | null>(null);
    const [sortValue , setSortValue] = useState<string>('A-Z')
    const [searchString,setSearchString] = useState<string>('')


    useEffect(()=>{
   
        fetch(`https://api.github.com/search/users?q=${searchString}`)
        .then(res => res.json())
        .then(res => {
            if(res.message==="Validation Failed")
            {
                setUserList([])
            }
            else{
                setUserList(res.items)
            }
            
        })
    //     .catch(err => {
    //         console.log(err)
    //         setUserList([])} );
        
      } ,[searchString]);

      useEffect(()=>{
        if(userList)
        { 
        var sortedUserList : userType[] = sortUsers(sortValue , userList)
        
        console.log(sortedUserList)
        setUserList([...sortedUserList])}

      } ,[sortValue]);

      
    return(
        <div className='home-container'>
        <Navbar setSearchString={setSearchString} setSortValue={setSortValue}/>
        <UserList userList={userList} />
        </div>
    )
}

export default Homepage;