interface userType {
  login: string;
}

const sortUsers: Function = (sortType: string, userList: userType[]) => {
  switch (sortType) {
    case "A-Z":
      return userList.sort((a: userType, b: userType) => {
        const nameA: string = a.login.toLowerCase();
        const nameB: string = b.login.toLowerCase();
        return nameB < nameA ? 1 : nameB > nameA ? -1 : 0;
      });

    case "Z-A":
      return userList.sort((a: userType, b: userType) => {
        const nameA: string = a.login.toLowerCase();
        const nameB: string = b.login.toLowerCase();
        return nameB < nameA ? -1 : nameB > nameA ? 1 : 0;
      });
  }
  return userList;
};

export default sortUsers;
