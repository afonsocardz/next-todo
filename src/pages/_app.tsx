import Header, { headerStyles } from "@/layouts/Header";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { CSSProperties, ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Header />
      <div style={defaultStyle}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

const defaultStyle: CSSProperties = {
  marginTop: headerStyles.height,
  padding: "12px",
  backgroundColor: "lightgray",
  height: "100vh",
};
