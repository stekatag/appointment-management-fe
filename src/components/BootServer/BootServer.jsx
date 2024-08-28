import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Box,
  Alert,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const API_URL = "https://barbershop-api-uz70.onrender.com/v1";

export default function BootServer() {
  const navigate = useNavigate();
  const [error, setError] = useState(false); // State to track errors

  useEffect(() => {
    const bootServer = async () => {
      try {
        await axios.get(`${API_URL}/health`);
        // After the server is awake, redirect the user back to the home page
        navigate("/");
      } catch (error) {
        console.error("Failed to boot the server:", error);
        setError(true); // Set error state to true if boot fails
      }
    };

    bootServer();
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {error ? (
        <Alert severity="warning">
          Failed to boot the server. Please try again later or contact support.
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                Contact Support
              </Button>
            </Link>
          </Box>
        </Alert>
      ) : (
        <>
          <CircularProgress />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Waking up the server, please wait...
          </Typography>
        </>
      )}
    </Box>
  );
}
