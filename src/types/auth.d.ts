// auth.d.ts
interface IAuth {
  token: string | null;
  user: IUser | null;
}

interface IUser {
  ID: string;
  username: string;
  role: string;
}

interface LoginResponse {
  token: string | null;
  user: IUser | null;
}
