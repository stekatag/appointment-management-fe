import { styled, Box } from "@mui/material/";

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "start",
  },
}));
