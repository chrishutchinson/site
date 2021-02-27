/** @jsxImportSource theme-ui */

import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import { config } from "@fortawesome/fontawesome-svg-core";

import theme from "../theme";
import { usePanelbear } from "../utils/panelbear";

config.autoAddCss = false;

const PANELBEAR_SITE_ID = "72CeUgcKa4h";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  usePanelbear(PANELBEAR_SITE_ID);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default CustomApp;
