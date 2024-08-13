import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography } from "@mui/material";

// Background image with overlay styling
export const HeroSectionContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundImage: `url(https://images.unsplash.com/photo-1672257493626-038f96997ade?q=80&w=1840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, // Use the appropriate image URL
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color as needed
    zIndex: 1,
  },

  [theme.breakpoints.down("md")]: {
    height: "75vh",
  },
}));

// Styled container for text content to ensure proper z-index
export const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
}));

// Styled buttons
export const HeroButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 4),
  border: "2px solid #AF8447",
  fontWeight: 700,
  color: "#fff",
  backgroundColor: "#AF8447",

  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "#fff",
    color: "#fff",
  },

  "&.MuiButton-outlined": {
    color: "#AF8447",
    borderColor: "#fff",
    backgroundColor: "#fff",

    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "#fff",
      color: "#fff",
    },
  },
}));

export const MainTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
