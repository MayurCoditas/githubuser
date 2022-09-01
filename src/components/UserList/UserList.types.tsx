export interface IUserListProps {
  sortValue: string;
  searchString: string;
}

export interface IUserType {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  repos_url: string;
}
