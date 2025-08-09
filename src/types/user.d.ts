interface IUserItem {
  id: string;
  username: string;
  password: string;
  password_confirm: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface IUserCreate {
  username: string;
  password: string;
  password_confirm: string;
  role: string;
}

interface IUserUpdate extends IUserCreate {
  id: string;
}

interface IUserData {
  userList: IUserItem[];
  status: string;
  page?: number;
  limit?: number;
  total_data?: number;
  total_page?: number;
}

interface IUserResponse {
  data: IUserData;
  message: string;
  status: string;
}

// interface IUserResponseSingle {
//   data: IUserItem;
//   message: string;
//   status: string;
// }
