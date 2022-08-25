import './userCard.scss'
import React, { Fragment, useState } from 'react';
import Repo from '../Repo/Repo';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';

interface UserPropType {
    user : {
        login:string,
       
    }
}

interface UserDataType {
        followers:number,
        following:number,
        avatar_url:string,
        html_url:string,
        repos_url:string
}

const UserCard =({user} : UserPropType) => {
  
    interface repoType {
        name:string,
        language:string
    }

    const [userData ,setUserData] = useState<UserDataType | null>(null)

    useEffect(()=>{
        fetch(`https://api.github.com/users/${user.login}`)
        .then(res=>res.json())
        .then(data=>{setUserData(data)})

    },[user.login])


    const [repos , setRepos] = useState<repoType[] | null>(null)
    const [flag , setFlag] = useState<boolean>(false)

    const handleClick = (e : React.MouseEvent) => {
        e.preventDefault();
        if(!flag && userData)
        {
            console.log(userData.repos_url)
            fetch(`${userData.repos_url}`)
            .then(res=>res.json())
            .then(data=>{
            setRepos(data)
            })
        }
        
        setFlag(!flag)
    }

    return(
        <Fragment>
        {userData ? 
        <div className="userCard-container">
        <div className='image-container'>
         <img src={userData.avatar_url} alt={user.login} />
         </div>
         <div className='info-container'>
        <p className='userName'>{user.login}</p>
        <p>Profile Url: {userData.html_url}</p>
        <div className='follower-container'>
            
            <p>Followers : {userData.followers}</p>
            <p>Following : {userData.following}</p>
           
        
        </div>
        <div>
        {
            flag?<div>
                <div className='collapse-headings'>
                <p className='repo-heading'>Repository</p>
                <p className='language-heading'>Language</p>
                </div>
                {repos?repos.map((repo,index)=><Repo key={index} repo={repo} />):<Spinner/>}</div>:null
        }
        </div>
    
        </div>
        <div className='button-container'>
        <button onClick={handleClick}>{flag?`Collapse`:'Details'}</button>
        </div>
        
        </div>
         : null}
         </Fragment>
    )
}

export default UserCard;