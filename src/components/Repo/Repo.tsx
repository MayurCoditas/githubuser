import React from "react";
import "./Repo.scss";
import { IRepoProps } from "./Repo.types";

const Repo: React.FC<IRepoProps> = ({ repo }) => {
  return (
    <div className="repo-container">
      <p className="repo-name">{repo.name} </p>
      <p className="repo-language">
        {repo.language ? repo.language : "Not Specified"}
      </p>
    </div>
  );
};

export default Repo;
