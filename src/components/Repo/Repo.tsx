import React from "react";
import './repo.scss'

const Repo = ({repo}) => {

    return(
        <div className="repo-container">
            <p>{repo.name} </p>
            <p className="repo-language">{repo.language}</p>

        </div>
    )
}

export default Repo;