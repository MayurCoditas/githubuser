import axios from "axios";
import { IRepoType } from "./repo.types";

interface ResType {
  data: IRepoType | null;
}

export const getRepoInfo = async (
  url: string,
  handleRepos: Function
): Promise<void> => {
  try {
    let res: ResType = await axios.get(url);
    handleRepos(res.data);
  } catch (error) {
    console.log(error);
    handleRepos([]);
  }
};
