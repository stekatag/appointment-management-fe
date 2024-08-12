import { AppBar, Toolbar, Container, Button, Grid } from "@mui/material";
import { styled } from "@mui/material";

const NavBarContainer = styled(AppBar)(() => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  borderBottom: "1px solid #ccc", // Optional: adds a bottom border to the navbar
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: "black",
  margin: theme.spacing(1),
  "&:hover": {
    color: "#af8447", // Hover color effect
  },
}));

export default function Navbar() {
  return (
    <NavBarContainer position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <NavLink>HOME</NavLink>
              <NavLink>ABOUT US</NavLink>
              <NavLink>SERVICES</NavLink>
              <NavLink>BLOG</NavLink>
              <NavLink>PAGES</NavLink>
              <NavLink>SHOP</NavLink>
              <NavLink>CONTACT</NavLink>
            </Grid>
            <Grid item>
              <NavLink variant="outlined">BOOKING</NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </NavBarContainer>
  );
}
