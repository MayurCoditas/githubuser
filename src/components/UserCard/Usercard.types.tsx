export interface UserPropType {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
    repos_url: string;
  };
}

export interface UserDataType {
  followers: number;
  following: number;
}

export interface RepoType {
  name: string;
  language: string;
}
