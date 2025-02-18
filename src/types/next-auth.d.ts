interface IUser {
  ID: string;
  username: string;
  role: string;
}
interface IUserPayload {
  username: string;
  password: string;
}

interface IAuthResponse {
  data: {
    user: {
      ID: string;
      created_at: string;
      password: string;
      role: string;
      updated_at: string;
      username: string;
    };
    token: string;
  };
  message: string;
  status: boolean;
}
