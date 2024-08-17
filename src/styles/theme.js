import { createTheme } from "@mui/material/styles";

// Define your custom font families
const serifFont = '"Merriweather", serif';

// Create a theme instance with custom fonts and button overrides
const theme = createTheme({
  typography: {
    fontFamily: serifFont, // Default font for all text
    h1: {
      fontWeight: 600,
      fontSize: "3rem",
      "@media (max-width:900px)": {
        // Breakpoint for md (900px)
        fontSize: "2.5rem",
      },
      "@media (max-width:600px)": {
        // Breakpoint for sm (600px)
        fontSize: "2rem",
      },
    },
    h2: {
      fontWeight: 500,
      fontSize: "2.25rem",
      "@media (max-width:900px)": {
        // Breakpoint for md (900px)
        fontSize: "1.75rem",
      },
      "@media (max-width:600px)": {
        // Breakpoint for sm (600px)
        fontSize: "1.5rem",
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem",
      "@media (max-width:900px)": {
        // Breakpoint for md (900px)
        fontSize: "1.5rem",
      },
      "@media (max-width:600px)": {
        // Breakpoint for sm (600px)
        fontSize: "1.25rem",
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      "@media (max-width:900px)": {
        // Breakpoint for md (900px)
        fontSize: "1.25rem",
      },
      "@media (max-width:600px)": {
        // Breakpoint for sm (600px)
        fontSize: "1rem",
      },
    },
    body1: {
      color: "#2a2a2a",
    },
  },
  palette: {
    primary: {
      main: "#AF8447",
      dark: "#694f2b",
      light: "#f4e0c8",
      custom: "#efe6da",
    },
    secondary: {
      main: "#3b3b3b",
      light: "#646464",
      dark: "#2a2a2a",
      darker: "#212121",
    },
    background: {
      default: "#fff", // This sets the default background color
      paper: "#fff", // Default for MUI Paper components
      custom: "#f2f2f2", // Custom background color you can use throughout the app
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

export default theme;
