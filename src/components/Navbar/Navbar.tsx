import React from "react";
import { useState } from "react";
import Button from "../Button/Button";
import "./Navbar.scss";
import { NavPropTypes } from "./Navbar.types";

const Navbar: React.FC<NavPropTypes> = ({ setSearchString, setSortValue }) => {
  const [searchStr, setSearchStr] = useState<string>("");

  const handleSearchClick: React.MouseEventHandler = (e: React.MouseEvent) => {
    let newStr: string = searchStr.concat("");
    setSearchString(newStr);
  };
  const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setSortValue(target.value);
  };
  const handleSearchChange: React.ChangeEventHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    setSearchStr(target.value);
  };

  return (
    <div className="nav-container">
      <div className="nav-filter-container">
        <select
          className="nav-filter"
          id="sort"
          onChange={(e) => handleChange(e)}
        >
          <option value="A-Z">Name A-Z</option>
          <option value="Z-A">Name Z-A</option>
        </select>
      </div>
      <div className="nav-search-container">
        <input
          className="nav-search"
          type="text"
          placeholder="Enter username"
          onChange={(e) => handleSearchChange(e)}
        />
        <Button buttonType="search-button" handleClick={handleSearchClick}>
          <i className="fa fa-search"></i>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
