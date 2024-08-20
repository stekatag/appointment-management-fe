import { styled } from "@mui/material/styles";
import { Box, Button, Card, CardMedia, Dialog } from "@mui/material";

export const BackgroundColorContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.custom,
}));

// Styled container for the video section
export const VideoSectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(5),
  padding: theme.spacing(8, 0),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(6),
    alignItems: "start",
  },
}));

// Styled container for the text content
export const TextContent = styled(Box)(({ theme }) => ({
  maxWidth: "40%",

  "& > h3": {
    fontWeight: "600",
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.down("md")]: {
    maxWidth: "80%",
  },

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

// Styled button for the CTA
export const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1, 4),
  fontWeight: "bold",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Styled Card for the video thumbnail with white border and shadow
export const VideoThumbnailCard = styled(Card)(({ theme }) => ({
  position: "relative",
  width: "60%",
  overflow: "hidden",
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const VideoThumbnailCardInner = styled(Box)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// Styled CardMedia for the video thumbnail
export const VideoThumbnailMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "56.25%", // 16:9 aspect ratio by default
}));

// Styled play button icon, centered within the thumbnail
export const PlayButton = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "60px",
  height: "60px",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  transition: "background-color 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Wrapper for the responsive YouTube video
export const VideoWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingBottom: "56.25%", // 16:9 aspect ratio
  height: 0,
  overflow: "hidden",
  width: "100%",

  "& iframe": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
  },
}));

// Styled dialog for the video popup
export const VideoDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    padding: 0,
    border: "4px solid #fff",
    backgroundColor: "#000",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.487)",
    maxWidth: "80vw",
    maxHeight: "80vh",
    minWidth: "320px",
    minHeight: "180px",
    width: "60vw",
    height: "auto",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      border: "none",
    },
  },
}));
