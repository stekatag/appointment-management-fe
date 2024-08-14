import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const ServicesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.custom,
}));

export const ServiceTabContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const ServiceGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const ServiceItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  textAlign: "left",
}));

export const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

export const ServiceTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),

  "& > h3": {
    fontWeight: "bold",
  },
}));

export const ServicePrice = styled(Typography)(({ theme }) => ({
  fontSize: "1.15rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
}));

export const BookButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(0.8, 2.2),
  fontWeight: "bold",
  fontSize: "0.8rem",
  marginTop: theme.spacing(2),
  alignSelf: "baseline",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Add styles to handle tabs better on small screens
export const CustomTabs = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  overflowX: "auto",
  whiteSpace: "nowrap",

  "& .MuiTab-root": {
    fontSize: "1rem",
    textTransform: "none",
    minWidth: "auto",
    padding: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
}));
