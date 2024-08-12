import { styled } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { LocationOn, Phone, Email, GitHub } from "@mui/icons-material";

export const TopBarContainer = styled(Box)(({ theme }) => ({
  color: "black",
  padding: "0.7rem 1.6rem",
  fontSize: "0.875rem",
  width: "100%",
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

export const IconText = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& > *:not(:first-of-type)": {
    marginLeft: "1.5rem",
  },
});

export const IconStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
}));

export const LinkIcon = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "black",
  marginLeft: theme.spacing(1),

  "&:hover": {
    color: "#ffd700",
  },
}));

export const HorizontalLine = styled(Box)(() => ({
  width: "100%",
  height: "0.5px",
  backgroundColor: "#ccc",
}));

export const icons = {
  LocationOn,
  Phone,
  Email,
  GitHub,
};
