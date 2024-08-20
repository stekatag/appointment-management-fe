import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useUpdateUserMutation,
  useFetchUsersQuery,
} from "../../services/api/usersApi";
import DashboardLayout from "../../layouts/DashboardLayout";

// Form validation schema
const profileSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const ProfileManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const {
    data: users,
    refetch,
    isLoading: isUsersLoading,
  } = useFetchUsersQuery();
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    refetch(); // Refetch users when the component mounts to get the latest list
  }, [refetch]);

  useEffect(() => {
    if (profileSuccess) {
      setTimeout(() => setProfileSuccess(false), 3000);
    }
  }, [profileSuccess]);

  useEffect(() => {
    if (passwordSuccess) {
      setTimeout(() => setPasswordSuccess(false), 3000);
    }
  }, [passwordSuccess]);

  const onSubmitProfile = async (data) => {
    try {
      await updateUser({ id: user.id, ...data }).unwrap();
      setProfileSuccess(true);
      refetch();
      reset(data); // Reset the form with updated data
    } catch (error) {
      setAlert({ type: "error", message: `Error: ${error.message}` });
    }
  };

  const onSubmitPassword = async (data) => {
    if (data.currentPassword !== user.password) {
      setAlert({ type: "error", message: "Current password is incorrect." });
      return;
    }

    try {
      await updateUser({ id: user.id, password: data.newPassword }).unwrap();
      setPasswordSuccess(true);
      resetPassword(); // Reset the password form
    } catch (error) {
      setAlert({ type: "error", message: `Error: ${error.message}` });
    }
  };

  if (isUsersLoading) {
    return <CircularProgress />;
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      {/* Profile Information Form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitProfile)}
        sx={{ mt: 2, maxWidth: 600 }}
      >
        <Typography variant="h6" gutterBottom>
          Update Profile Information
        </Typography>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              required
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              required
            />
          )}
        />
        {profileSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={isUpdating}
        >
          Update Profile
        </Button>
      </Box>

      {/* Password Change Form */}
      <Box
        component="form"
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        sx={{ mt: 4, maxWidth: 600 }}
      >
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <Controller
          name="currentPassword"
          control={controlPassword}
          render={({ field }) => (
            <TextField
              {...field}
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!passwordErrors.currentPassword}
              helperText={passwordErrors.currentPassword?.message}
              required
            />
          )}
        />
        <Controller
          name="newPassword"
          control={controlPassword}
          render={({ field }) => (
            <TextField
              {...field}
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!passwordErrors.newPassword}
              helperText={passwordErrors.newPassword?.message}
              required
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={controlPassword}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!passwordErrors.confirmPassword}
              helperText={passwordErrors.confirmPassword?.message}
              required
            />
          )}
        />
        {passwordSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Password changed successfully!
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={isUpdating}
        >
          Change Password
        </Button>
      </Box>
    </DashboardLayout>
  );
};

export default ProfileManagement;
