import { createSlice } from "@reduxjs/toolkit";
import { IState } from ".";
import { logInAction, logOutAction } from "../actions/users";
import LocalStorage from "../class/LocalStorage";
import { IUser } from "../interface/user";
import { PERSIST_ROOT, X_JWT } from "../constants";
const initialState: IUser = {
  isLoggedIn: false,
  user: null,
};
export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logInAction.pending, (state, action) => {})
      .addCase(logInAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        LocalStorage.setItem(X_JWT, action.payload!.token!);
      })
      .addCase(logInAction.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(logOutAction.pending, (state, action) => {})
      .addCase(logOutAction.fulfilled, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        LocalStorage.removeItem(X_JWT);
        LocalStorage.removeItem(PERSIST_ROOT);
      })
      .addCase(logOutAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});

export const isLoggedInSelector = (state: IState) => state.users.isLoggedIn;
export const userSelector = (state: IState) => state.users.user;

export default users;
