import { Typography, Container, Grid } from "@mui/material";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import HomeIcon from "@mui/icons-material/Home";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function BarberDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component="h1"
        variant="h3"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, mb: 4 }}
      >
        Barber Dashboard
      </Typography>
      <Grid container spacing={4}>
        <DashboardCard icon={HomeIcon} title="Home Page" to="/" />
        <DashboardCard
          icon={WatchLaterIcon}
          title="Appointments"
          to="/appointments"
        />
        <DashboardCard
          icon={AccountCircleIcon}
          title="My Profile"
          to="/profile"
        />
      </Grid>
    </Container>
  );
}
