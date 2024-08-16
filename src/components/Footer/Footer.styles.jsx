import { styled } from "@mui/material";
import { Box, Typography, Link } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#212121",
  paddingTop: theme.spacing(6),
  color: "#fff",
}));

export const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  display: "block",
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[400],
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(4),
  backgroundColor: "#111", // Darker section for bottom
}));

export const FooterIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
