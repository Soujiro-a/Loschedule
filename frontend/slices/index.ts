import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import users from "./users";
import teams from "./teams";
import { ITeam } from "../interface/team";
import { IUser } from "../interface/user";

export interface IState {
  users: IUser;
  teams: ITeam;
}

const rootReducer = (state: IState | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      return action.payload;
    default:
      const combineReducer = combineReducers({ users, teams });
      return combineReducer(state, action);
  }
};

export default rootReducer;
