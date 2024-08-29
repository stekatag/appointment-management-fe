import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const StyledAuthLink = styled(Link)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));
