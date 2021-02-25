/** @jsxImportSource theme-ui */

import NextApp from "next/app";
import { ThemeProvider } from "theme-ui";
import { config } from "@fortawesome/fontawesome-svg-core";

import theme from "../theme";

config.autoAddCss = false;

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
