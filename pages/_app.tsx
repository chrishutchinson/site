/** @jsxImportSource theme-ui */

import { config } from "@fortawesome/fontawesome-svg-core";
import { Analytics } from "@vercel/analytics/next";
import { AppProps } from "next/app";
import { ThemeUIProvider } from "theme-ui";

import theme from "../theme";

config.autoAddCss = false;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeUIProvider theme={theme}>
      <Analytics />
      <Component {...pageProps} />
    </ThemeUIProvider>
  );
};

export default CustomApp;
