import axios from "axios";
import { RepoType } from "../components/UserCard/Usercard.types";

interface ResType {
    data : RepoType | null
}

export const getRepoInfo : Function =  async (url:string , setRepos :Function ) => 
{
    try {
        let res : ResType = await axios.get(url)
        setRepos(res.data)
    } catch (error) {
        console.log(error)
        setRepos([])
    }
   
   
}
