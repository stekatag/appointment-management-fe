import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHandleSectionLink } from "../../utils/navigationUtils";
import { logout } from "../../store/authSlice";
import { scroller } from "react-scroll";
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
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavClick = useHandleSectionLink();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
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

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // If on the homepage, scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on a different page, navigate to the homepage
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.sectionId) {
      // After navigation to the home page, scroll to the section
      scroller.scrollTo(location.state.sectionId, {
        duration: 350,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);

  const drawerContent = (
    <Box sx={{ width: "100%" }}>
      <List>
        <ListItem button component={Link} to="/" onClick={handleHomeClick}>
          <StyledListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <StyledListItemText primary="About Us" />
        </ListItem>
        <ListItem button component={Link} to="/barbers">
          <StyledListItemText primary="Barbers" />
        </ListItem>
        <ListItem button onClick={() => handleNavClick("services-section")}>
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
                  <NavLink onClick={handleHomeClick}>Home</NavLink>
                  <Link to="/about">
                    <NavLink>About us</NavLink>
                  </Link>
                  <Link to="/barbers">
                    <NavLink>Barbers</NavLink>
                  </Link>
                  <NavLink onClick={() => handleNavClick("services-section")}>
                    Services
                  </NavLink>
                  <Link to="/contact">
                    <NavLink>Contact us</NavLink>
                  </Link>
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
                      <Link to={getDashboardRoute()}>
                        <NavLink>Dashboard</NavLink>
                      </Link>
                      <NavLink onClick={handleLogout}>Sign Out</NavLink>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <NavLink>Sign In</NavLink>
                      </Link>

                      <Link to="/register">
                        <NavLink>Sign Up</NavLink>
                      </Link>
                    </>
                  )}
                </>
              )}
              <NavLink
                variant="outlined"
                onClick={() => handleNavClick("booking-section")}
              >
                Book Now
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </NavBarContainer>
  );
}
