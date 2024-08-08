// StyledPaper.js

import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";

const StyledSlot = styled(Paper)(({ theme, isBooked, isSelected }) => ({
  padding: theme.spacing(1.5),
  textAlign: "center",
  backgroundColor: isBooked ? "#ccc" : isSelected ? "#90caf9" : "#fff",
}));

export default StyledSlot;
