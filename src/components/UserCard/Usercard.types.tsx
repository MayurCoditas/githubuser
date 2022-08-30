export interface IUserCardProps {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
  };
}

export interface IUserDataType {
  followers: number;
  following: number;
}

export interface IRepoType {
  name: string;
  language: string;
  id: number;
}
