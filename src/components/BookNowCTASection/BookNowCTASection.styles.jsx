import { styled } from "@mui/material/styles";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export const BookNowContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(0, 3),
  },
}));

// Styled component for the Button
export const ViewServicesButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1, 4),
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Styled Box for the container with padding
export const BookNowBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

// Styled Grid container
export const BookNowGridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "start",
  },
}));

// Styled Typography for the title
export const BookNowTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700, // You can adjust this if you want a bolder look

  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
}));

// Styled Typography for the subtitle
export const BookNowSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,

  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));
