import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PeopleIcon from "@mui/icons-material/People";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import StarIcon from "@mui/icons-material/Star";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function DashboardListItems() {
  const userRole = useSelector((state) => state.auth.user?.role);

  const getDashboardRoute = () => {
    switch (userRole) {
      case "admin":
        return "/admin/dashboard";
      case "barber":
        return "/barber/dashboard";
      case "user":
        return "/user/dashboard";
      default:
        return "/";
    }
  };

  return (
    <>
      <ListItemButton component={Link} to={getDashboardRoute()}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/appointments">
        <ListItemIcon>
          <WatchLaterIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItemButton>
      {(userRole === "user" || userRole === "admin") && (
        <ListItemButton component={Link} to="/reviews">
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItemButton>
      )}
      {userRole === "admin" && (
        <>
          <ListItemButton component={Link} to="/manage-barbers">
            <ListItemIcon>
              <ContentCutIcon />
            </ListItemIcon>
            <ListItemText primary="Barbers" />
          </ListItemButton>
          <ListItemButton component={Link} to="/manage-services">
            <ListItemIcon>
              <CleaningServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
          <ListItemButton component={Link} to="/manage-users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </>
      )}
      <ListItemButton component={Link} to="/profile/notifications">
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItemButton>
      <ListItemButton component={Link} to="/profile">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
    </>
  );
}
