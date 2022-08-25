import { useState } from 'react';
import {useEffect} from 'react';
import Navbar from "../components/Navbar/Navbar";
import UserList from "../components/UserList/UserList";
import React from 'react';
import './homepage.scss'

const Homepage = () => {

    interface userType  {
        login:string,
        id:number,
        node_id:string,
        avatar_url:string,
        gravatar_id:string,


    }
    const [userList , setUserList] = useState <userType[] | null>(null);
    const [sortValue , setSortValue] = useState<string>('A-Z')
    const [searchString,setSearchString] = useState<string>('')


    useEffect(()=>{
   
        fetch(`https://api.github.com/search/users?q=${searchString}`)
        .then(res => res.json())
        .then(res => {setUserList(res.items)
        })
        .catch(err => {
            console.log(err)
            setUserList([])} );
        
      } ,[searchString]);

      useEffect(()=>{
        if(userList)
        {var sortedUserList : userType[] 
        sortedUserList = sortUsers(sortValue , userList)
        
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

const sortUsers = (sortType ,userList) => {
    switch(sortType)
    {
        case 'A-Z':
            return userList.sort((a:any,b:any)=> {
                const nameA:string = a.login.toLowerCase()
                const nameB:string = b.login.toLowerCase()
                return (nameB<nameA)?1:(nameB>nameA)?-1:0});
            break;
        case 'Z-A':
            return userList.sort((a,b)=> {
                const nameA:string = a.login.toLowerCase()
                const nameB:string = b.login.toLowerCase()
                return (nameB<nameA)?-1:(nameB>nameA)?1:0});
            break;
        case 'Rank-Ascending':
            break;
        case 'Rank-Descending':
            break;
    }

}

export default Homepage;