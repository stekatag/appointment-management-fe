import { styled } from "@mui/material/styles";
import { Box, Grid, Button, Container, Typography } from "@mui/material";

export const ContactContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

export const ContactInfoContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const ContactFormContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const ContactTitle = styled(Typography)(() => ({
  fontWeight: 600,
}));

export const ContactInfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const ContactIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "1.5rem",
  color: theme.palette.primary.main,
}));

export const ContactButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  fontSize: "1rem",
}));
