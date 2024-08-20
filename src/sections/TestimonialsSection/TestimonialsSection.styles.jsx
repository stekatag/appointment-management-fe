import { Grid, styled, Typography } from "@mui/material";
import { Box, Card, Avatar, Button } from "@mui/material";

export const TestimonialsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundImage:
    "url('https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/slide1-2-1.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
}));

export const TitlesContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(2),

  "& h3": {
    color: "#fff",
    fontWeight: 600,
  },

  "& h6": {
    color: "rgba(255, 255, 255, 0.856)",
  },
}));

export const TestimonialCardsContainer = styled(Grid)(() => ({
  marginTop: "0",
}));

export const TestimonialCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#fff",
  position: "relative",
  zIndex: 2,
  borderRadius: theme.shape.borderRadius,
}));

export const TestimonialNameContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

export const TestimonialRatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const TestimonialContent = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),

  "& h6, h2": {
    fontSize: "1.15rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

export const TestimonialDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

export const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  border: `2px solid ${theme.palette.primary.main}`,
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  marginInline: "auto",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1, 4),
  fontWeight: "bold",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
