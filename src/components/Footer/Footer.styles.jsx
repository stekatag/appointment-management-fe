import { styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  paddingTop: theme.spacing(6),
  color: "#fff",
}));

export const FooterTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  display: "block",
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[200],
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),

  "& > p": {
    color: theme.palette.grey[200],
  },
}));

export const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.secondary.darker,
}));

export const FooterIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),

  "& > a": {
    fontSize: "0.9rem",
    marginBottom: 0,
  },

  "& > p": {
    color: theme.palette.grey[200],
  },
}));
