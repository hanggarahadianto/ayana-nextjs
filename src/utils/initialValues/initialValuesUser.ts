// Initial Values untuk Create User
export const getInitialValuesCreateUser = (): IUserCreate => ({
  username: "",
  password: "",
  password_confirm: "",
  role: "",
});

// Initial Values untuk Update User
export const getInitialValuesUpdateUser = (user: IUserUpdate): IUserUpdate => ({
  id: user.id, // wajib ada
  username: user.username || "",
  password: "",
  password_confirm: "",
  role: user.role || "",
});
