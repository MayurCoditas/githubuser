import React from "react";
import './repo.scss'

interface RepoProps {
    key:number
    repo:{name: string,
    language: string
    }
}

const Repo = ({repo} : RepoProps) => {

    return(
        <div className="repo-container">
            <p>{repo.name} </p>
            <p className="repo-language">{repo.language}</p>

        </div>
    )
}

export default Repo;