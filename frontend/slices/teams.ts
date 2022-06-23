import { createSlice } from "@reduxjs/toolkit";
import { logInAction } from "../actions/users";
import { ITeam } from "../interface/team";
const initialState: ITeam = {};
export const posts = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logInAction.pending, (state, action) => {})
      .addCase(logInAction.fulfilled, (state, action) => {})
      .addCase(logInAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});
export default posts.reducer;
