export interface IUser {
  isLoggedIn: boolean;
  user: OutputLoginUserType;
}

export type InputUserType = {
  nickname: string;
  password: string;
};

export type OutputLoginUserType = {
  token?: string;
  nickname?: string;
} | null;

export interface ICreateUserForm {
  id: string;
  password: string;
}
