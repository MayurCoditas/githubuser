import axios from "axios";

export const searchUsers: Function = async (
  searchString: string,
  currentPage: number,
  itemsPerPage: number,
  setUserList: Function,
  setPagecount: Function
) => {
  try {
    let res = await axios.get(
      `https://api.github.com/search/users?q=${searchString}&page=${currentPage}&per_page=${itemsPerPage}`
    );
    setUserList(res.data.items);
    setPagecount(Math.ceil(res.data.total_count / itemsPerPage));
  } catch (error) {
    console.log(error);
    setUserList([]);
    setPagecount(0);
  }
};

export const getUserInfo : Function = async (loginName:string , setUserData:Function) => {
    try {
       let res = await axios.get(`https://api.github.com/users/${loginName}`)
       setUserData(res.data)
    } catch (error) {
        console.log(error);
        setUserData(null)
    }
}