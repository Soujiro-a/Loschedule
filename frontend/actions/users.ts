import { createAsyncThunk } from "@reduxjs/toolkit";
import { InputUserType, OutputLoginUserType } from "../interface/user";
import axios from "axios";
interface rejectMessage {
  errorMessage: string;
}

export const logOutAction = createAsyncThunk(
  "user/logOut",
  async (data, thnukAPI) => {}
);
export const logInAction = createAsyncThunk<
  OutputLoginUserType,
  InputUserType,
  { rejectValue: rejectMessage }
>("user/logIn", async (data: InputUserType, { rejectWithValue }) => {
  const {
    data: { ok, token, error },
  }: { data: { ok: boolean; token?: string; error?: string } } =
    await axios.post(`${process.env.backendUrl}/user/login`, {
      ...data,
    });

  if (!ok) {
    return rejectWithValue({ errorMessage: error! });
  }

  return {
    nickname: data.nickname,
    token: token,
  };
});
