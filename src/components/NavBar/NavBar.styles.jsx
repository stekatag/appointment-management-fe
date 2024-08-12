import { styled } from "@mui/material";
import { AppBar, Button } from "@mui/material";

export const NavBarContainer = styled(AppBar)(() => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: "0.5rem 0",
  borderBottom: "1px solid #ccc",

  // eslint-disable-next-line no-dupe-keys
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
}));

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
}));
