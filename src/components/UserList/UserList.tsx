import React from "react";
import UserCard from "components/UserCard/UserCard";
import { useEffect, useState } from "react";
import "components/UserList/UserList.scss";
import Footer from "components/Footer/Footer";
import sortUsers from "utils/sorting/sorting";
import Spinner from "components/Spinner/Spinner";
import { IUserListProps, IUserType } from "components/UserList/interfaces";
import { searchUsers } from "services/user/users";
import { itemsPerPage } from "components/UserList/constants";

const UserList: React.FC<IUserListProps> = ({ sortValue, searchString }) => {
  const [currentItems, setCurrentItems] = useState<IUserType[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [userList, setUserList] = useState<IUserType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
    setUserList(null);
    setTotalCount(0);
    setCurrentItems(null);
  }, [searchString]);

  useEffect(() => {
    const fetchUsers: () => void = async () => {
      const data = await searchUsers(searchString, currentPage, itemsPerPage);
      setUserList(data.items);
      setTotalCount(data.total_count);
    };
    fetchUsers();
  }, [searchString, currentPage]);

  useEffect(() => {
    if (userList) {
      var sortedUserList: IUserType[] = sortUsers(sortValue, userList);
      setCurrentItems([...sortedUserList]);
    }
  }, [userList, sortValue]);

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
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
