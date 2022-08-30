import "./UserCard.scss";
import React, { Fragment, useState } from "react";
import Repo from "../Repo/Repo";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import { IUserCardProps, IUserDataType, IRepoType } from "./Usercard.types";
import { getUserInfo } from "../../services/users";
import { getRepoInfo } from "../../services/repo";

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const [userData, setUserData] = useState<IUserDataType | null>(null);
  const [repos, setRepos] = useState<IRepoType[] | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo(user.login, handleUserData);
  }, [user.login]);

  const handleClick: React.MouseEventHandler = async (
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    if (!flag) getRepoInfo(user.repos_url, handleRepos);
    setFlag(!flag);
  };

  const handleUserData = (user: IUserDataType) => {
    setUserData(user);
  };

  const handleRepos = (repo: IRepoType[]) => {
    setRepos(repo);
  };

  return (
    <Fragment>
      <div className="userCard-container">
        <div className="image-container">
          <img src={user.avatar_url} alt={user.login} />
        </div>
        <div className="info-container">
          <p className="userName">{user.login}</p>
          <p>Profile Url: {user.html_url}</p>

          {userData ? (
            <div className="follower-container">
              <p>Followers : {userData.followers}</p>
              <p>Following : {userData.following}</p>
            </div>
          ) : null}

          {flag ? (
            <div className="collapse-container">
              <div className="collapse-headings">
                <p className="repo-heading">Repository</p>
                <p className="language-heading">Language</p>
              </div>
              {repos ? (
                repos.length === 0 ? (
                  <div className="no-repo-info">
                    <p>No Repos Present</p>
                  </div>
                ) : (
                  repos.map((repo, index) => <Repo key={repo.id} repo={repo} />)
                )
              ) : (
                <Spinner />
              )}
            </div>
          ) : null}
        </div>
        <div className="button-container">
          <Button handleClick={handleClick} buttonType="">
            {flag ? "Collapse" : "Details"}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
