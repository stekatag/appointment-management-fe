import { styled, Box, Button } from "@mui/material";

export const SectionContainer = styled(Box)(({ theme }) => ({
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
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  fontSize: "1rem",
  fontWeight: 600,
  padding: theme.spacing(1.25, 2.75),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
