import './userCard.scss'
import React, { useState } from 'react';
import Repo from '../Repo/Repo';
const UserCard =({user}) => {
  
    interface repoType {
        name:string,
        language:string
    }


    const [repos , setRepos] = useState<repoType[]>([])
    const [flag , setFlag] = useState<boolean>(false)

    const handleClick = (e : React.MouseEvent) => {
        e.preventDefault();
        if(!flag)
        {
            fetch(`${user.repos_url}`)
            .then(res=>res.json())
            .then(data=>{console.log(data)
            setRepos(data)
            })
        }
       
        setFlag(!flag)
    }

    return(
        <div className="userCard-container">
        <div className='image-container'>
         <img src={user.avatar_url} alt={user.login} />
         </div>
         <div className='info-container'>
        <p className='userName'>{user.login}</p>
        <p>Profile Url: {user.html_url}</p>
        <div className='follower-container'>
            <div>
            <p>Followers : {user.followers}</p>
            <p>Following : {user.following}</p>
            </div>
        <button onClick={handleClick}>Details</button>
        </div>
        <div>
        {
            flag?repos.map((repo,index)=><Repo key={index} repo={repo} />):null
        }
        </div>
        
        </div>
        </div>
    )
}

export default UserCard;