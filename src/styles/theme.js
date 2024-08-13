import { createTheme } from "@mui/material/styles";

// Define your custom font families
const serifFont = '"Merriweather", serif';

// Create a theme instance with custom fonts and button overrides
let theme = createTheme({
  typography: {
    fontFamily: serifFont, // Default font for all text
  },
  palette: {
    primary: {
      main: "#AF8447",
    },
    secondary: {
      main: "#6b6b6b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "currentColor",
          "&:hover": {
            borderColor: "currentColor",
            backgroundColor: "#AF8447",
            color: "#fff",
          },
        },
      },
    },
  },
});

// Now, define global styles with access to the fully initialized theme
theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "100%", // Default font size
          [theme.breakpoints.down("lg")]: {
            fontSize: "95%", // 100% at large breakpoint
          },
          [theme.breakpoints.down("md")]: {
            fontSize: "85%", // 80% at medium breakpoint
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "75%", // 70% at small breakpoint
          },
          [theme.breakpoints.down("xs")]: {
            fontSize: "65%", // 60% at extra small breakpoint
          },
        },
      },
    },
  },
});

export default theme;
