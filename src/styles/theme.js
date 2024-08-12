import { createTheme } from "@mui/material/styles";

// Define your custom font families
const serifFont = '"Merriweather", serif';

// Create a theme instance with custom fonts and button overrides
const theme = createTheme({
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

export default theme;
