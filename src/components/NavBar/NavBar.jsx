import { Toolbar, Container, Grid } from "@mui/material";
import { NavBarContainer, NavLink } from "./NavBar.styles";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavBarContainer position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <NavLink>Home</NavLink>
              <NavLink>About us</NavLink>
              <NavLink>Barbers</NavLink>
              <NavLink>Services</NavLink>
              <NavLink>Contact us</NavLink>
            </Grid>
            <Grid item>
              <NavLink>
                <Link to="/login">Sign In</Link>
              </NavLink>
              <NavLink>
                <Link to="/register">Sign Up</Link>
              </NavLink>
              <NavLink variant="outlined">Book Now</NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </NavBarContainer>
  );
}
