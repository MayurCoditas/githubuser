export interface IUserType {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}

export interface IResponse {
  items: IUserType[] | null;
  total_count: number;
}

export interface IUserData {
  followers: number;
  following: number;
}
