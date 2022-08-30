import axios from "axios";
import { IUserType } from "./users.types";

export const searchUsers = async (
  searchString: string,
  currentPage: number,
  itemsPerPage: number,
  handleUserList: (userList: IUserType[]) => void,
  handlePageCount: (count: number) => void
) => {
  try {
    let res = await axios.get(
      `https://api.github.com/search/users?q=${searchString}&page=${currentPage}&per_page=${itemsPerPage}`
    );
    handleUserList(res.data.items);
    handlePageCount(res.data.total_count);
  } catch (error) {
    console.log(error);
    handleUserList([]);
    handlePageCount(0);
  }
};

export const getUserInfo = async (
  loginName: string,
  handleUserData: Function
) => {
  try {
    let res = await axios.get(`https://api.github.com/users/${loginName}`);
    handleUserData(res.data);
  } catch (error) {
    console.log(error);
    handleUserData(null);
  }
};
