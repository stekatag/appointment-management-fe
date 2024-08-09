import { Link } from "react-router-dom";
import { Button, Typography, Container, Grid } from "@mui/material";

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
      <Grid container spacing={2}>
        <Grid item>
          <Button
            component={Link}
            to="/appointments/create"
            variant="contained"
            color="primary"
          >
            Create Appointment
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/appointments/edit/50bb"
            variant="contained"
            color="primary"
          >
            Edit Appointment
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
