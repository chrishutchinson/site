import Document, { Head, Html, Main, NextScript } from "next/document";
import { Box, InitializeColorMode } from "theme-ui";

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Mali:wght@300;500&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <InitializeColorMode />

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
