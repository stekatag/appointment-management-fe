import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function AdminBase() {
  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4">Admin Base Route</Typography>
      </Box>
    </DashboardLayout>
  );
}
