import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
  palette: {
    mode: "light" as const,
    background: {
      default: "#F8F9FA", // Soft light background
      paper: common.white,
    },
    primary: {
      contrastText: common.white,
      main: "#4A2E65", // Deep Plum
    },
    secondary: {
      contrastText: "#1A1A1A",
      main: "#F6F5F5", // Off-white / light gray surface
    },
    text: {
      primary: "#1A1A1A", // Dark neutral text
      secondary: "#666666", // Muted text (removed 'dark' to prevent TS error)
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#F8F9FA", height: "100%", minHeight: "100%" },
      },
    },
  },
  shadow,
  typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
