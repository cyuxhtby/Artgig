import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
    cssVarPrefix: "artgig",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Inter, monospace",
  },
  styles: {
    global: {
      html: {
        height: "100%",
        width: "100%",
        bg: "#0E0E10",
      },
      body: {
        height: "100%",
        width: "100%",
        bg: "#0E0E10",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "gray",
      },
    },
  },
  sizes: {
    container: {
      page: "1170px",
    },
  },
  breakpoints: {
    xs: "320px",
    sm: "480px",   
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
});

export default theme;
