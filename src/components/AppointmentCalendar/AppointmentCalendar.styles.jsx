import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";

const StyledSlot = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isBooked" && prop !== "isSelected",
})(({ theme, isBooked, isSelected }) => ({
  padding: theme.spacing(1.5),
  textAlign: "center",
  backgroundColor: isBooked ? "#ccc" : isSelected ? "#90caf9" : "#fff",
  border: isSelected
    ? `2px solid ${theme.palette.primary.main}`
    : "2px solid transparent",
}));

export default StyledSlot;
