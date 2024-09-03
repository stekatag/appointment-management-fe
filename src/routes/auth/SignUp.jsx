import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterUserMutation } from "../../services/api/authApi";
import { useFetchUserByIdQuery } from "../../services/api/usersApi";
import useRedirectByRole from "../../utils/redirectByRole";
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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  contactNumber: yup
    .string()
    .trim()
    .matches(
      /^0\d{9}$/,
      "Enter a valid phone number starting with 0 and containing 10 digits"
    )
    .required("Contact number is required"),
  isAdmin: yup.boolean(),
});

export default function SignUp() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const redirectByRole = useRedirectByRole();
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // State to store the userId after registration
  const [userId, setUserId] = useState(null);

  // Using the hook to fetch user data by ID, it will automatically refetch when userId changes
  const { data: updatedUser } = useFetchUserByIdQuery(userId, {
    skip: !userId, // Skip fetching if userId is null
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const role = formData.isAdmin ? "admin" : "user";
    // eslint-disable-next-line no-unused-vars
    const { isAdmin, confirmPassword, ...userData } = formData; // Omit confirmPassword

    try {
      const result = await registerUser({ ...userData, role }).unwrap();

      if (result) {
        const { tokens, user } = result;

        // Save the tokens and user information to localStorage
        localStorage.setItem("token", tokens.access.token);
        localStorage.setItem("refreshToken", tokens.refresh.token);
        localStorage.setItem("user", JSON.stringify(user));

        // Set the userId state to trigger useFetchUserByIdQuery
        setUserId(user.id);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Registration failed: ${error.data?.message || error.message}`,
      });
    }
  };

  useEffect(() => {
    if (updatedUser) {
      redirectByRole(updatedUser.role);
      setAlert({ type: "success", message: "User registered successfully!" });
    }
  }, [updatedUser, redirectByRole]);

  const password = watch("password");

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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          {alert.message && (
            <Alert severity={alert.type} sx={{ mb: 3 }}>
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    required
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    fullWidth
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="contactNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contact Number"
                    fullWidth
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
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
                    onChange={(e) => {
                      field.onChange(e);
                      setConfirmPasswordTouched(true);
                    }}
                    error={
                      (confirmPasswordTouched && field.value !== password) ||
                      !!errors.confirmPassword
                    }
                    helperText={
                      confirmPasswordTouched && field.value !== password
                        ? "Passwords do not match"
                        : "" || errors.confirmPassword?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isAdmin"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="Register as Admin"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              isLoading ||
              (confirmPasswordTouched && watch("confirmPassword") !== password)
            }
          >
            {isLoading ? (
              <CircularProgress size="1.5rem" color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <StyledAuthLink to="/login">
            Already have an account? Sign in
          </StyledAuthLink>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
