// auth.d.ts
interface IAuth {
  token: string | null;
  user: IUser | null;
}

interface IUser {
  ID: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
}
