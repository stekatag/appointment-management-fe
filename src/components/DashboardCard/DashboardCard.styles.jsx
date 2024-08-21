import { Icon, styled, Typography } from "@mui/material";

export const DashboardCardIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 38,

  [theme.breakpoints.down("md")]: {
    fontSize: 32,
  },
}));

export const DashboardCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.primary.dark,
  fontWeight: "bold",
  marginTop: theme.spacing(1),

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
