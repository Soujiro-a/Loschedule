import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTeamAction = createAsyncThunk(
  "team/create",
  async (data, thnukAPI) => {}
);
