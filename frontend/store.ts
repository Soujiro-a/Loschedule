import { configureStore, EnhancedStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./slices";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const devMode = process.env.NODE_ENV === "development";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeConfiguredStore = (reducer: Reducer) =>
  configureStore({
    reducer,
    middleware: [],
    devTools: devMode,
  });
const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const store = makeConfiguredStore(persistedReducer);
    let persistor = persistStore(store);
    return { persistor, ...store };
  }
};
export const wrapper = createWrapper(makeStore, {
  debug: devMode,
});

export default wrapper;
