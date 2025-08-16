/** @jsxImportSource theme-ui */

import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { config } from "@fortawesome/fontawesome-svg-core";

import theme from "../theme";

config.autoAddCss = false;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default CustomApp;
