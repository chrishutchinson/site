import { Theme } from "theme-ui";

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  useLocalStorage: false,
  colors: {
    text: "#111",
    background: "#e9eee9",
    primary: "#5DA271",
    secondary: "#437551",
    muted: "#437551",
    highlight: "#5DA271",
    gray: "#6c6c6c",
    buff: "#ffffff",
    accent: "#C84630",
    subtle: "#3f3f3f",
    hoverText: "#040404ff",
    linkText: "#1d3ec2ff",
    visitedLinkText: "rgba(130, 23, 172, 1)",
    modes: {
      dark: {
        text: "#FFF",
        background: "#222",
        muted: "#222",
        buff: "#111",
        subtle: "#ddd",
        highlight: "#333",
        hoverText: "#FFF",
        linkText: "#FFF",
      },
    },
  },
  fonts: {
    body: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    heading: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    serifBody: `"Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif", "Times","Source Serif Pro", serif`,
  },
  fontSizes: [12, 14, 16, 22, 28, 36, 42, 50, 72, 100],
  lineHeights: {
    heading: 1.3,
    body: 1.5,
    article: 1.8,
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
      borderBottom: "2px solid",
    },
    navLink: {
      color: "text",
      textDecoration: "none",
    },
  },
  text: {
    body: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    article: {
      fontFamily: "serifBody",
      lineHeight: "article",
      fontWeight: "body",
      fontSize: 20,
    },
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
      transition: "color 0.15s ease",
    },
    blockquote: {
      px: 3,
      py: 1,
      borderLeft: "2px dotted",
      borderColor: "subtle",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: 0,
      lineHeight: "body",
      transition: "background-color 0.15s ease",
    },
    hr: {
      border: 0,
      backgroundColor: "transparent",
      height: "4px",
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: "accent",
    },
    a: {
      color: "linkText",
      ":visited": {
        color: "visitedLinkText",
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
