import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import {
  useTheme,
  useMediaQuery,
  Toolbar,
  Container,
  Grid,
  Box,
  ListItem,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  NavBarContainer,
  NavLink,
  StyledIconButton,
  StyledDrawer,
  StyledListItemText,
} from "./NavBar.styles";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Access the user from the Redux store
  const user = useSelector((state) => state.auth.user);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getDashboardRoute = () => {
    if (user?.role === "admin") {
      return "/admin/dashboard";
    } else if (user?.role === "user") {
      return "/user/dashboard";
    }
    return "/";
  };

  const drawerContent = (
    <Box sx={{ width: "100%" }}>
      <List>
        <ListItem button component={Link} to="/">
          <StyledListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <StyledListItemText primary="About Us" />
        </ListItem>
        <ListItem button component={Link} to="/barbers">
          <StyledListItemText primary="Barbers" />
        </ListItem>
        <ListItem button component={Link} to="/services">
          <StyledListItemText primary="Services" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <StyledListItemText primary="Contact Us" />
        </ListItem>
        {user ? (
          <ListItem button component={Link} to={getDashboardRoute()}>
            <StyledListItemText primary="Dashboard" />
          </ListItem>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <StyledListItemText primary="Sign In" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <StyledListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <NavBarContainer position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              {!isSmallScreen && (
                <>
                  <NavLink>Home</NavLink>
                  <NavLink>About us</NavLink>
                  <NavLink>Barbers</NavLink>
                  <NavLink>Services</NavLink>
                  <NavLink>Contact us</NavLink>
                </>
              )}
              {isSmallScreen && (
                <>
                  <StyledIconButton
                    edge="start"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </StyledIconButton>
                  <StyledDrawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                  >
                    {drawerContent}
                  </StyledDrawer>
                </>
              )}
            </Grid>
            <Grid item>
              {!isSmallScreen && (
                <>
                  {user ? (
                    <>
                      <NavLink>
                        <Link to={getDashboardRoute()}>Dashboard</Link>
                      </NavLink>
                      <NavLink onClick={handleLogout}>Sign Out</NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink>
                        <Link to="/login">Sign In</Link>
                      </NavLink>
                      <NavLink>
                        <Link to="/register">Sign Up</Link>
                      </NavLink>
                    </>
                  )}
                </>
              )}
              <NavLink variant="outlined">Book Now</NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </NavBarContainer>
  );
}
