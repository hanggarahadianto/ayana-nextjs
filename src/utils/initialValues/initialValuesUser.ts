// Initial Values untuk Create User
export const getInitialValuesCreateUser = (): IUserCreate => ({
  username: "",
  password: "",
  password_confirm: "",
  role: "",
});

// Initial Values untuk Update User
export const getInitialValuesUpdateUser = (user: Partial<IUserUpdate> = {}): IUserUpdate => {
  const { id = "", username = "", password = "", password_confirm = "", role = "" } = user;

  return {
    id,
    username,
    password,
    password_confirm,
    role,
  };
};
