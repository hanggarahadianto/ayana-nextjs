interface IUser {
  id: string;
  username: string;
  role: string;
  companies: ICompanyItem[];
}
interface IUserPayload {
  username: string;
  password: string;
}

interface IAuthResponse {
  data: {
    user: {
      id: string;
      created_at: string;
      password: string;
      role: string;
      companies: ICompanyItem[];
      updated_at: string;
      username: string;
    };
    token: string;
  };
  message: string;
  status: boolean;
}
