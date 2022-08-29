import React from "react";
import './Repo.scss';
import {RepoProps} from './Repo.types'



const Repo : React.FC<RepoProps> = ({repo}) => {

    return(
        <div className="repo-container">
            <p>{repo.name} </p>
            <p className="repo-language">{repo.language}</p>

        </div>
    )
}

export default Repo;