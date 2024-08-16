import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const TopBarContainer = styled(Box)(({ theme }) => ({
  color: "black",
  padding: "0.7rem 1.6rem",
  fontSize: "0.875rem",
  width: "100%",
  zIndex: 1000,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.75rem",
  },
}));

export const IconText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& > *:not(:first-of-type)": {
    marginLeft: "1.5rem",
  },
  // from md and lower, the margin left applies to all elements
  [theme.breakpoints.down("md")]: {
    "& > *": {
      marginLeft: "1.5rem",
    },
  },
}));

export const IconStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
}));

export const LinkIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    marginLeft: "1.2rem",
  },
}));

export const LinkIcon = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "black",
  marginLeft: theme.spacing(1),
  transition: "color 0.2s",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const HorizontalLine = styled(Box)(() => ({
  width: "100%",
  height: "0.5px",
  backgroundColor: "#ccc",
}));
