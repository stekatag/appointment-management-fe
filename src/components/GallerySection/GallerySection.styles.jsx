import { styled } from "@mui/material";
import { Box } from "@mui/material";

export const GalleryContainer = styled(Box)(({ theme }) => ({
  width: "100%", // Ensure the gallery takes up the full width of the viewport
  padding: theme.spacing(8, 0),
  backgroundColor: "#f2f2f2",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  "& h3": {
    fontWeight: 600,
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

export const GalleryItem = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  "&:hover img": {
    transform: "scale(1.05)",
  },
}));

export const GalleryImage = styled("img")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "auto",
  transition: "transform 0.3s ease-in-out",
  borderRadius: theme.shape.borderRadius,
}));
