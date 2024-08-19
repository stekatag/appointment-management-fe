import { List, styled, Typography } from "@mui/material";
import { Box, Paper, ListItem, Container } from "@mui/material";

export const ReviewsSectionContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

export const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SidebarHeaderRating = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const SidebarMain = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const SidebarItem = styled(Box)(({ theme, selected }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: selected ? theme.palette.primary.light : "transparent",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.primary.light
      : theme.palette.background.default,
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 2),
}));

export const ReviewItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 0),
}));

export const ReviewName = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(0.5),
}));

export const ReviewTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

export const ReviewText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
