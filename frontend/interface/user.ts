export interface IUser {
  _id: string;
  nickname: string;
  role: string;
  characters: string[];
  teams: string[];
}

export interface IUserState {
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
