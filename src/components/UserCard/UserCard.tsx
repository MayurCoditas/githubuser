import "./userCard.scss";
import React, { Fragment, useState } from "react";
import Repo from "../Repo/Repo";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

interface UserPropType {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
  };
}

interface UserDataType {
  followers: number;
  following: number;
}

interface repoType {
  name: string;
  language: string;
}

const UserCard = ({ user }: UserPropType) => {
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${user.login}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, [user.login]);

  const [repos, setRepos] = useState<repoType[] | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!flag) {
      console.log(user.repos_url);
      fetch(`${user.repos_url}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (Array.isArray(data)) setRepos(data);
        });
    }

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
