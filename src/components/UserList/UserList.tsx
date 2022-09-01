import React from "react";
import UserCard from "../UserCard/UserCard";
import { useEffect, useState, useRef } from "react";
import "./UserList.scss";
import Footer from "../Footer/Footer";
import sortUsers from "../../utils/sorting";
import Spinner from "../Spinner/Spinner";
import { IUserListProps, IUserType } from "./UserList.types";
import { searchUsers } from "../../services/users";
import { itemsPerPage } from "./UserList.constants";

const UserList: React.FC<IUserListProps> = ({ sortValue, searchString }) => {
  const [currentItems, setCurrentItems] = useState<IUserType[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [userList, setUserList] = useState<IUserType[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isFirstRender = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      setCurrentPage(1);
      setUserList(null);
      setTotalCount(0);
      setCurrentItems(null);
    }
  }, [searchString]);

  useEffect(() => {
    if (isFirstRender.current) {
      searchUsers(
        searchString,
        currentPage,
        itemsPerPage,
        handleUserList,
        handlePageCount
      );
    }
  }, [searchString, currentPage]);

  useEffect(() => {
    if (isFirstRender.current) {
      if (userList) {
        var sortedUserList: IUserType[] = sortUsers(sortValue, userList);
        setCurrentItems([...sortedUserList]);
      }
    }
    isFirstRender.current = true;
  }, [userList, sortValue]);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };
  const handleUserList = (userList: IUserType[]) => {
    setUserList(userList);
  };
  const handlePageCount = (count: number) => {
    setTotalCount(count);
  };

  return (
    <div className="userList-container">
      {userList ? (
        <div>
          <p className="total-result-heading">
            Total Results : {totalCount ? totalCount : "0"}
          </p>
          {currentItems?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}

          <Footer
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            pageCount={Math.ceil(totalCount / itemsPerPage)}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default UserList;
