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
  role: string;
  password: string; // <- ini tidak optional
  password_confirm: string; // <- ini juga
}

interface IUserUpdate {
  id: string;
  username: string;
  role: string;
  password?: string;
  password_confirm?: string;
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
