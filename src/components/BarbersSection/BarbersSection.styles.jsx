import { styled } from "@mui/material/styles";
import { Box, Icon } from "@mui/material";
import { Link } from "react-router-dom";

export const BarbersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.custom, // Assuming you added the custom background color to your theme

  "& h3": {
    fontWeight: 600,
  },
}));

export const BarberCard = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 2.75fr",
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr 1fr",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1.5fr",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    padding: theme.spacing(3.5),
  },
}));

export const BarberImage = styled(Box)(({ theme }) => ({
  "& img": {
    display: "block",
    width: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
  },
}));

export const BarberInfo = styled(Box)(() => ({
  padding: "2rem",

  "& h4": {
    fontSize: "1.15rem",
    fontWeight: 600,
  },
}));

export const ContactInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  marginTop: theme.spacing(2),

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export const ContactInfoInner = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const ContactIcon = styled(Icon)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: "bold",

  "&:hover": {
    textDecoration: "underline",
  },
}));
