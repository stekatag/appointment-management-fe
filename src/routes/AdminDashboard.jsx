import { Typography, Container, Grid } from "@mui/material";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import HomeIcon from "@mui/icons-material/Home";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PeopleIcon from "@mui/icons-material/People";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import StarIcon from "@mui/icons-material/Star";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AdminDashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component="h1"
        variant="h3"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, mb: 4 }}
      >
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <DashboardCard icon={HomeIcon} title="Home Page" to="/" />
        <DashboardCard
          icon={WatchLaterIcon}
          title="Appointments"
          to="/appointments"
        />
        <DashboardCard icon={StarIcon} title="Reviews" to="/reviews" />
        <DashboardCard
          icon={ContentCutIcon}
          title="Barbers"
          to="/manage-barbers"
        />
        <DashboardCard
          icon={CleaningServicesIcon}
          title="Services"
          to="/manage-services"
        />
        <DashboardCard icon={PeopleIcon} title="Users" to="/manage-users" />
        <DashboardCard
          icon={AccountCircleIcon}
          title="My Profile"
          to="/profile"
        />
      </Grid>
    </Container>
  );
}
