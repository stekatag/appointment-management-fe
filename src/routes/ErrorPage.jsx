import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <ErrorOutlineIcon color="error" style={{ fontSize: 100 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          404: Page Not Found
        </Typography>
        <Typography variant="body1" align="center">
          Sorry, the page you are looking for does not exist. You can always go
          back to the homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          style={{ marginTop: 20 }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}
