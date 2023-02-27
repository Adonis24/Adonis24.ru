import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {  Pagination } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "../styles/embla.scss";
//import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { Raleway, IBM_Plex_Sans } from "@next/font/google";
// add bootstrap css
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";
const raleway = Raleway({ subsets: ["latin"] });
// //redux

import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
//redux
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  SwiperCore.use([Autoplay]);
  return (
    <>
      <style jsx global>{`
        :root {
          --raleway-font: ${raleway.style.fontFamily};
        }
      `}</style>
      <Head>
        <title> АДОНИС</title>
        <meta
          name="discription"
          content="on-line magazin for shoping goods"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>

      <Layout>
            <Component {...pageProps} />
      </Layout>
   
        </Provider>
     
    </>
  );

  /* 
   <PersistGate loading={null} persistor={persistor}>
     </PersistGate>
  import store from "../styles/utils/store";
  import { persistStore } from "redux-persist";
   <Provider store={store}>
   const persistor = persistStore(store);
   import { PersistGate } from "redux-persist/integration/react";
            <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={session}>
            
   */
}
