import { Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Admin Dashboard page
      </Typography>
      <Button
        component={Link}
        to="/appointments/create"
        variant="contained"
        color="primary"
      >
        Create Appointment
      </Button>
      {/* Other dashboard content */}
    </Container>
  );
}
