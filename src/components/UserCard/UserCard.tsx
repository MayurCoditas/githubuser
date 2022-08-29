import "./UserCard.scss";
import React, { Fragment, useState } from "react";
import Repo from "../Repo/Repo";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import { UserPropType, UserDataType, RepoType } from "./Usercard.types";
import { getUserInfo } from "../../services/users";
import { getRepoInfo } from "../../services/repo";

const UserCard: React.FC<UserPropType> = ({ user }) => {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [repos, setRepos] = useState<RepoType[] | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo(user.login, setUserData);
  }, [user.login]);

  const handleClick: React.MouseEventHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!flag) getRepoInfo(user.repos_url, setRepos);
    setFlag(!flag);
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
            <div>
              <div className="collapse-headings">
                <p className="repo-heading">Repository</p>
                <p className="language-heading">Language</p>
              </div>
              {repos ? (
                repos.map((repo, index) => <Repo key={index} repo={repo} />)
              ) : (
                <Spinner />
              )}
            </div>
          ) : null}
        </div>
        <div className="button-container">
          {flag ? (
            <Button handleClick={handleClick} buttonType="">
              Collapse
            </Button>
          ) : (
            <Button handleClick={handleClick} buttonType="">
              Details
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
