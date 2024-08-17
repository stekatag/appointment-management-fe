import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

export const BreadcrumbsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(7, 0),
  backgroundImage: `
  linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.35)
  ),
  url('https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/slide1-2-1.jpg')
`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  color: theme.palette.common.white,

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(5.5, 0),
  },
}));

export const StyledNavigateNextIcon = styled(NavigateNextIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "1.25rem",
}));

export const BreadcrumbLink = styled(Link)(({ theme }) => ({
  color: theme.palette.background.custom,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const BreadcrumbText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
}));

export const BreadcrumbsTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  marginTop: theme.spacing(2),
}));
