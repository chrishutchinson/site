import { dom } from "@fortawesome/fontawesome-svg-core";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { InitializeColorMode } from "theme-ui";

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
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta
            name="theme-color"
            content="#FFF"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#222222"
            media="(prefers-color-scheme: dark)"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                ${dom.css()}
              `,
            }}
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
