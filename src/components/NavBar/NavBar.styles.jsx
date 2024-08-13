import { styled } from "@mui/material";
import {
  AppBar,
  Button,
  IconButton,
  Drawer,
  ListItemText,
} from "@mui/material";

// Styled AppBar container
export const NavBarContainer = styled(AppBar)(() => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: "0.5rem 0",
  borderBottom: "1px solid #ccc",

  // eslint-disable-next-line no-dupe-keys
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
}));

// Styled Button for navigation links
export const NavLink = styled(Button)(({ theme }) => ({
  color: "black",
  padding: "0.75rem 1.45rem",
  marginRight: theme.spacing(1),
  textTransform: "uppercase",
  textDecoration: "none",

  "& > a": {
    textDecoration: "none",
    color: "inherit",
  },

  [theme.breakpoints.down("lg")]: {
    padding: "0.5rem 1rem",
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "1.1rem",
  },
}));

// Styled IconButton for the hamburger menu
export const StyledIconButton = styled(IconButton)(() => ({
  color: "black",

  "& > svg": {
    width: "2.2rem",
    height: "2.2rem",
  },
}));

// Styled Drawer for the hamburger menu
export const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: "50vw", // Set drawer width to 50% of the viewport width
  },
}));

// Styled ListItemText for drawer items
export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: "1rem", // Default font size

  "& > span": {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.35rem", // Increased font size for md and below
    },
  },
}));
