import { createSlice } from "@reduxjs/toolkit";
import { createTeamAction } from "../actions/teams";
import { ITeam } from "../interface/team";
const initialState: ITeam = {};
export const teams = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createTeamAction.pending, (state, action) => {})
      .addCase(createTeamAction.fulfilled, (state, action) => {})
      .addCase(createTeamAction.rejected, (state, action) => {})
      .addDefaultCase(() => {}),
});
export default teams;
