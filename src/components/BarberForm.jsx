import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUpdateUserMutation, useFetchUsersQuery } from "../services/api";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: yup
    .string()
    .url("Invalid image URL")
    .required("Image URL is required"),
});

export default function BarberForm({ barberToEdit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedUserId: barberToEdit?.id || "",
      firstName: barberToEdit?.firstName || "",
      lastName: barberToEdit?.lastName || "",
      title: barberToEdit?.title || "",
      email: barberToEdit?.email || "",
      image: barberToEdit?.image || "",
    },
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const { data: users, isLoading: isLoadingUsers } = useFetchUsersQuery();

  const selectedUserId = watch("selectedUserId");
  const [showFields, setShowFields] = useState(!!barberToEdit);

  useEffect(() => {
    if (barberToEdit) {
      setShowFields(true);
    } else if (selectedUserId) {
      const selectedUser = users?.find(
        (user) => user.id === selectedUserId && user.role === "user"
      );
      if (selectedUser) {
        setValue("firstName", selectedUser.firstName);
        setValue("lastName", selectedUser.lastName);
        setValue("email", selectedUser.email);
        setShowFields(true);
      } else {
        setShowFields(false);
      }
    }
  }, [selectedUserId, users, setValue, barberToEdit]);

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        role: "barber", // Update the user's role to barber
      };

      await updateUser({ id: selectedUserId, ...userData }).unwrap();

      // Set the alert message based on the operation
      const message = barberToEdit
        ? "Barber updated successfully!"
        : "Barber assigned successfully!";
      navigate("/manage-barbers", {
        state: {
          alert: { severity: "success", message },
        },
      });
    } catch (error) {
      setAlert({ type: "error", message: `Error: ${error.message}` });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {barberToEdit ? "Edit Barber" : "Assign Barber"}
          </Typography>
        </Grid>
        {alert.message && (
          <Grid item xs={12}>
            <Alert severity={alert.type}>
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Select User by Email</InputLabel>
            <Controller
              name="selectedUserId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Select User by Email"
                  disabled={isLoadingUsers || !!barberToEdit}
                  value={field.value} // Ensure the value is set
                >
                  {users
                    ?.filter((user) =>
                      barberToEdit
                        ? user.id === barberToEdit.id || user.role === "user"
                        : user.role === "user"
                    )
                    .map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.email}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>

      {showFields && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  disabled
                  fullWidth
                  InputProps={{ readOnly: true }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  disabled
                  fullWidth
                  InputProps={{ readOnly: true }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  fullWidth
                  error={!!errors.image}
                  helperText={errors.image?.message}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isUpdating}
              fullWidth
            >
              {barberToEdit ? "Update Barber" : "Assign Barber"}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

BarberForm.propTypes = {
  barberToEdit: PropTypes.object,
};
