import "../styles/globals.scss";
// so we are going to wrap our app into provider store that will feed all the stored info. we need to import a few packages
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

//we start by declaring our persistor that will persist our store
let persistor = persistStore(store);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //here we are wrapping our entire app with the provider and we are passing it store which equals to the store we have set up previously
  return (
    <>
      <Head>
        <title>Shop Pay</title>
        <meta
          name="description"
          content="Shoppay-online shopping service for all of your needs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
