import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import rootReducer, { IState } from "./slices";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import LocalStorage from "./class/LocalStorage";
import { X_JWT } from "./constants";

const devMode = process.env.NODE_ENV === "development";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeConfiguredStore = (reducer: Reducer) =>
  configureStore({
    reducer: reducer as Reducer<IState, AnyAction>,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: {
          extraArgument: { jwt: LocalStorage.getItem(X_JWT) },
        },
      }),
    devTools: devMode,
  });

let store = makeConfiguredStore(persistedReducer);

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const persistor = persistStore(store);
    return { persistor, ...store };
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export default wrapper;
