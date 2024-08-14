import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    padding: theme.spacing(6, 0),
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  gap: theme.spacing(2.5),
}));

export const StatItemInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
}));

export const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: "2.2rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

// Styled component for the icons with controlled font size
export const StatIcon = styled(Box)(({ theme }) => ({
  fontSize: "4rem",
  color: theme.palette.primary.main,

  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));
