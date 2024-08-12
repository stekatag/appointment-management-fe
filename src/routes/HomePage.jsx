import { Link } from "react-router-dom";
import { Typography, Box, Button, Container } from "@mui/material";
import Header from "../components/Header/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
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
            <Link
              to="register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Button>
        </Box>
      </Container>
    </>
  );
}
