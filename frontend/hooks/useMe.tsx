import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import LocalStorage from "../class/LocalStorage";
import { X_JWT } from "../constants";
import { isLoggedInSelector, userSelector } from "../slices/users";
import { useAppSelector } from "./useAppSelector";

export const useMe = ({ redirectTo = "/login" }: { redirectTo?: string }) => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const loggedInUser = useAppSelector(userSelector);
  const token = LocalStorage.getItem(X_JWT);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) return;

      if (token) {
        const user = await axios.get(`${process.env.backendUrl}/user`, {
          headers: {
            "x-jwt": token,
          },
        });

        if (!user) {
          Router.push(redirectTo);
        } else {
          return user;
        }
      } else {
        Router.push(redirectTo);
      }
    })();
  });
  return loggedInUser;
};
