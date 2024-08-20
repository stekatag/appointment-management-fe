import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useRedirectByRole from "../utils/redirectByRole";
import { useLoginUserQuery } from "../services/api/usersApi";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
  const [loginQueryArgs, setLoginQueryArgs] = useState(null);

  const { data, error, isLoading } = useLoginUserQuery(
    loginQueryArgs ? { email: loginQueryArgs.email } : {},
    {
      skip: !loginQueryArgs,
    }
  );

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 1) {
      const user = data[0];
      if (loginQueryArgs && user.password === loginQueryArgs.password) {
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("user", JSON.stringify(user));
        redirectByRole(user.role);
      } else {
        setAlert({ type: "error", message: "Incorrect password." });
      }
    } else if (data && Array.isArray(data) && data.length > 1) {
      setAlert({
        type: "error",
        message: "Multiple accounts found with the same email.",
      });
    } else if (error || (data && data.length === 0)) {
      setAlert({
        type: "error",
        message: "Invalid credentials or user not found.",
      });
    }
  }, [data, error, redirectByRole, loginQueryArgs]);

  const onSubmit = (formData) => {
    setLoginQueryArgs(formData);
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
