import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

export const BarbersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.custom, // Assuming you added the custom background color to your theme
}));

export const BarberCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  boxShadow: theme.shadows[1],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const BarberImage = styled(Box)(({ theme }) => ({
  flex: "1 1 auto",
  marginRight: theme.spacing(2),
  "& img": {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}));

export const BarberInfo = styled(Box)(({ theme }) => ({
  flex: "2 1 auto",
}));

export const SocialIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2),
  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

export const ContactButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
