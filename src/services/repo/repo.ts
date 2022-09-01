import axios from "axios";
import { IRepoType } from "services/repo/interfaces";

interface ResType {
  data: IRepoType[] | null;
}

export const getRepoInfo = async (url: string): Promise<IRepoType[] | null> => {
  try {
    let response: ResType = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
