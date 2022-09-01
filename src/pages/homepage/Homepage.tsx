import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserList from "../../components/UserList/UserList";
import React from "react";
import "./Homepage.scss";

const Homepage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>("A-Z");
  const [searchString, setSearchString] = useState<string>('');

  const handleSearchString = (searchStr: string) => {
    setSearchString(searchStr);
  };

  const handleSortValue = (sortValue: string) => {
    setSortValue(sortValue);
  };

  return (
    <div className="home-container">
      <Navbar
        handleSearchString={handleSearchString}
        handleSortValue={handleSortValue}
      />
      <UserList sortValue={sortValue} searchString={searchString} />
    </div>
  );
};

export default Homepage;
