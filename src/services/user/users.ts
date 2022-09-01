import { IResponse, IUserData } from "services/user/interfaces";
import { axiosMyInstance } from "services/axios/axiosMyInstance";

export const searchUsers = async (
  searchString: string,
  currentPage: number,
  itemsPerPage: number
): Promise<IResponse> => {
  try {
    let response: { data: IResponse } = await axiosMyInstance.get(
      `/search/users?q=${searchString}&page=${currentPage}&per_page=${itemsPerPage}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { items: [], total_count: 0 };
  }
};

export const getUserInfo = async (
  loginName: string
): Promise<IUserData | null> => {
  try {
    let response: { data: IUserData } = await axiosMyInstance.get(
      `/users/${loginName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
