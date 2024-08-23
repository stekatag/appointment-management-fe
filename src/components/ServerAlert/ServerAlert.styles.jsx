import { styled, Link, Button, Grid } from "@mui/material";

export const AlertContainer = styled(Grid)(() => ({
  justifyContent: "center",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  display: "block",
  margin: theme.spacing(1.5, 0),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));
