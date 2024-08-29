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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/api/authApi";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const { control, handleSubmit } = useForm();
  const [alert, setAlert] = useState(null);
  const [resetPassword] = useResetPasswordMutation();

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
          <Alert fullWidth="true" severity={alert.type}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Reset Password
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
