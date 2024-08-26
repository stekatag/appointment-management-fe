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
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  useFetchUsersQuery,
} from "../services/api/usersApi";

// Validation schema for the form
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

  const navigate = useNavigate();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch,
  } = useFetchUsersQuery();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const selectedUserId = watch("selectedUserId");
  const [showFields, setShowFields] = useState(!!barberToEdit);

  useEffect(() => {
    refetch(); // Refetch users when the component mounts to get the latest list
  }, [refetch]);

  useEffect(() => {
    if (barberToEdit) {
      setShowFields(true);
    } else if (selectedUserId && usersData?.results) {
      const selectedUser = usersData.results.find(
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
  }, [selectedUserId, usersData, setValue, barberToEdit]);

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
        role: "barber", // Update the user's role to barber
      };

      await updateUser({ id: selectedUserId, ...userData }).unwrap();

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

  const eligibleUsers =
    usersData?.results?.filter((user) =>
      barberToEdit
        ? user.id === barberToEdit.id || user.role === "user"
        : user.role === "user"
    ) || [];

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
        {!isLoadingUsers && eligibleUsers.length === 0 && !barberToEdit ? (
          <Grid item xs={12}>
            <Alert severity="warning">
              <AlertTitle>No Available Users</AlertTitle>
              There are no users available to assign as a barber.
            </Alert>
            <Box mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/manage-barbers")}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        ) : (
          <>
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
                      value={field.value}
                    >
                      {eligibleUsers.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.email}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {showFields && (
              <>
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
                  <Box display="flex" gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isUpdating}
                    >
                      {barberToEdit ? "Update Barber" : "Assign Barber"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate("/manage-barbers")}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}

BarberForm.propTypes = {
  barberToEdit: PropTypes.object,
};
