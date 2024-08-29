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
import { useLocation, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/api/authApi";

export default function ResetPassword() {
  const location = useLocation();
  const { control, handleSubmit, watch } = useForm();
  const [alert, setAlert] = useState(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const onSubmit = async (data) => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    try {
      await resetPassword({ token, password: data.password }).unwrap();
      setAlert({
        type: "success",
        message: "Password has been reset successfully.",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.data?.message || "Failed to reset password.",
      });
    }
  };

  // Watch the password field for matching with the confirm password field
  const password = watch("password");

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
          Reset Password
        </Typography>
        {alert && (
          <Alert sx={{ width: "100%" }} severity={alert.type}>
            {alert.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type="password"
                fullWidth
                required
                margin="normal"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  field.onChange(e);
                  setConfirmPasswordTouched(true);
                }}
                error={confirmPasswordTouched && field.value !== password}
                helperText={
                  confirmPasswordTouched && field.value !== password
                    ? "Passwords do not match"
                    : ""
                }
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            disabled={
              isLoading ||
              (confirmPasswordTouched && watch("confirmPassword") !== password)
            }
          >
            {isLoading ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
          {alert?.type === "success" && (
            <Link to="/login">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </form>
      </Box>
    </Container>
  );
}
