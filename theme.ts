import { Theme } from "theme-ui";

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  colors: {
    text: "#111",
    background: "#fff",
    primary: "#5DA271",
    secondary: "#437551",
    muted: "#437551",
    highlight: "#5DA271",
    gray: "#6c6c6c",
    accent: "#C84630",
    subtle: "#3f3f3f",
    hoverText: "#FFF",
    modes: {
      dark: {
        text: "#FFF",
        background: "#222",
        muted: "#222",
        subtle: "#ddd",
        highlight: "#333",
        hoverText: "#FFF",
      },
    },
  },
  fonts: {
    body: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    heading: "Mali",
  },
  fontSizes: [12, 14, 16, 22, 28, 36, 42, 60, 72, 100],
  lineHeights: {
    heading: 1.05,
    body: 1.5,
  },
  fontWeights: {
    body: "normal",
    heading: 500,
  },
  links: {
    bold: {
      fontWeight: 0,
    },
    nav: {
      fontWeight: 0,
      color: "inherit",
      textDecoration: "none",
    },
    blockUnderline: {
      color: "text",
      textDecoration: "none",
      transition: "background 0.15s ease, color 0.15s ease",
      ":hover": {
        backgroundColor: "primary",
        color: "hoverText",
      },
      borderBottom: "2px solid",
      borderColor: "primary",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    label: {
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontSize: 1,
      color: "subtle",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: 0,
      lineHeight: "body",
      transition: "background-color 0.15s ease",
    },
    a: {
      color: "text",
      textDecorationColor: "#5DA271",
      textDecorationThickness: 2,
      transition: "background 0.15s ease, color 0.15s ease",
      ":hover": {
        backgroundColor: "primary",
        color: "hoverText",
      },
    },
    h1: {
      variant: "text.heading",
    },
    h2: {
      variant: "text.heading",
    },
  },
};

export default theme;
