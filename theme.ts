import { Theme } from "theme-ui";

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  colors: {
    text: "#111",
    background: "#fff",
    primary: "#3C6848",
    secondary: "#3f3f3f",
    muted: "#3f3f3f",
    highlight: "#3C6848",
    gray: "#6c6c6c",
    accent: "#C84630",
    modes: {
      dark: {
        text: "#FFF",
        background: "#222",
        muted: "#ddd",
        highlight: "#333",
      },
    },
  },
  fonts: {
    body: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    title: "Mali",
    heading: "Mali",
  },
  fontSizes: [12, 14, 16, 22, 28, 36, 42, 60, 72, 100],
  lineHeights: {
    title: 1.05,
    body: 1.5,
  },
  fontWeights: ["normal", 500],
  links: {
    bold: {
      fontWeight: 0,
    },
    nav: {
      fontWeight: 0,
      color: "inherit",
      textDecoration: "none",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: 0,
      lineHeight: "body",
    },
    a: {
      color: "text",
      textDecorationColor: "#3C6848",
      textDecorationThickness: 2,
      transition: "background 0.15s ease, color 0.15s ease",
      ":hover": {
        backgroundColor: "primary",
        color: "background",
      },
    },
    h1: {
      fontWeight: 1,
    },
  },
};

export default theme;
