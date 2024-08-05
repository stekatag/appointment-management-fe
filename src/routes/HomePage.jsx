import { Link } from "react-router-dom";
import { Typography, Box, Button, Container } from "@mui/material";
import "../App.css";

export default function HomePage() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        Appointment Management System
      </Typography>
      <Box mt={5} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary">
          <Link to="login" style={{ color: "#fff", textDecoration: "none" }}>
            Sign In
          </Link>
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="register" style={{ color: "#fff", textDecoration: "none" }}>
            Sign Up
          </Link>
        </Button>
      </Box>
    </Container>
  );
}
