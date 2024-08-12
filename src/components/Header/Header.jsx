import TopBar from "../TopBar/TopBar";
import Navbar from "../NavBar/NavBar";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ width: "100%" }}>
      <TopBar />
      <Navbar />
    </Box>
  );
}
