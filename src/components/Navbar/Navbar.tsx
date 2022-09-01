import React from "react";
import { useState } from "react";
import Button from "components/Button/Button";
import "components/Navbar/Navbar.scss";
import { INavProps } from "components/Navbar/interfaces";

const Navbar: React.FC<INavProps> = ({
  handleSearchString,
  handleSortValue,
}) => {
  const [searchStr, setSearchStr] = useState("");

  const handleSearchClick: React.MouseEventHandler = (
    event: React.MouseEvent
  ) => {
    handleSearchString(searchStr);
  };

  const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    handleSortValue(target.value);
  };

  const handleSearchChange: React.ChangeEventHandler = (
    event: React.ChangeEvent
  ) => {
    const target = event.target as HTMLSelectElement;
    setSearchStr(target.value);
  };

  return (
    <div className="nav-container">
      <div className="nav-filter-container">
        <select className="nav-filter" id="sort" onChange={handleChange}>
          <option value="A-Z">Sort By Name A-Z</option>
          <option value="Z-A">Sort By Name Z-A</option>
        </select>
      </div>
      <div className="nav-search-container">
        <input
          className="nav-search"
          type="text"
          placeholder="Enter username"
          onChange={handleSearchChange}
        />
        <Button buttonType="search-button" handleClick={handleSearchClick}>
          <i className="fa fa-search"></i>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
