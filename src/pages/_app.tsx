import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import theme from "../theme";
import Head from "next/head";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import { app } from "../firebase/firebase";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Anton } from "@next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";

// const anton = Anton({ weight: "400" });
const inter = Inter();
export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <title>
          eBoto Mo | An Online Voting System for Cavite State University - Don
          Severino Delas Alas Campus with Real-time Voting Count.
        </title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <FirebaseAppProvider firebaseApp={app}>
          {/* <FirestoreProvider sdk={firestore}> */}
          <ChakraProvider theme={theme}>
            <main className={inter.className}>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </main>
            <Analytics />
          </ChakraProvider>
          {/* </FirestoreProvider> */}
        </FirebaseAppProvider>
      </SessionProvider>
    </>
  );
}