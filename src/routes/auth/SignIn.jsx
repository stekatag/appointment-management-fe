import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useRedirectByRole from "../../utils/redirectByRole";
import { useLoginUserMutation } from "../../services/api/authApi";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../../components/Copyright/Copyright";
import { StyledAuthLink } from "./SignIn.styles";

// Define Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const redirectByRole = useRedirectByRole();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox

  const [loginUser, { data, error, isLoading }] = useLoginUserMutation();

  useEffect(() => {
    if (data) {
      redirectByRole(data.user.role);
    } else if (error) {
      setAlert({
        type: "error",
        message: "Invalid credentials or user not found.",
      });
    }
  }, [data, error, redirectByRole]);

  const onSubmit = (formData) => {
    loginUser({ ...formData, rememberMe });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {alert.message && (
            <Alert severity={alert.type}>
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                {...field}
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              "Sing In"
            )}
          </Button>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <StyledAuthLink to="/register">
                {"Don't have an account? Sign Up"}
              </StyledAuthLink>
            </Grid>
            <Grid item>
              <StyledAuthLink to="/forgot-password">
                Forgot password?
              </StyledAuthLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
