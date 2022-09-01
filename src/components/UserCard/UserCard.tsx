import "components/UserCard/UserCard.scss";
import React, { Fragment, useState } from "react";
import Repo from "components/Repo/Repo";
import { useEffect } from "react";
import Spinner from "components/Spinner/Spinner";
import Button from "components/Button/Button";
import {
  IUserCardProps,
  IUserDataType,
  IRepoType,
} from "components/UserCard/interfaces";
import { getUserInfo } from "services/user/users";
import { getRepoInfo } from "services/repo/repo";

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const [userData, setUserData] = useState<IUserDataType | null>(null);
  const [repos, setRepos] = useState<IRepoType[] | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser: () => void = async () => {
      const data: IUserDataType | null = await getUserInfo(user.login);
      setUserData(data);
    };
    fetchUser();
  }, [user.login]);

  const handleClick: React.MouseEventHandler = async (
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    const fetchRepoInfo: () => void = async () => {
      const data: IRepoType[] | null = await getRepoInfo(user.repos_url);
      setRepos(data);
    };
    if (!flag) {
      fetchRepoInfo();
    }
    setFlag(!flag);
  };

  return (
    <>
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
          ) : (
            <></>
          )}

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
          <Button handleClick={handleClick}>
            {flag ? "Collapse" : "Details"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
