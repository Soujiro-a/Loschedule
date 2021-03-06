import "../styles/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import wrapper, { makeConfiguredStore, persistedReducer } from "../store";
import React from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  const store = makeConfiguredStore(persistedReducer);
  const persistor = persistStore(store);
  return (
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
