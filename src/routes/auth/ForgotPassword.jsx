import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Container,
  Avatar,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForgotPasswordMutation } from "../../services/api/authApi";

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm();
  const [alert, setAlert] = useState(null);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email).unwrap();
      setAlert({
        type: "success",
        message: "Password reset link sent to your email.",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.data?.message || "Failed to send reset link.",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        {alert && (
          <Alert sx={{ width: "100%" }} severity={alert.type}>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
