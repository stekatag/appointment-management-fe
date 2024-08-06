import { useState } from "react";
import useForm from "../hooks/useForm";
import { useSelector } from "react-redux";
import { useCreateAppointmentMutation } from "../services/api";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb"; // Import the en-gb locale

const AppointmentForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [formState, handleInputChange] = useForm({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    contactNumber: "",
    email: user ? user.email : "",
    appointmentDateTime: null,
    preferredHairdresser: "",
    serviceType: "",
    additionalNotes: "",
    userId: user ? user.id : null,
  });

  const [createAppointment, { isLoading, isError }] =
    useCreateAppointmentMutation();
  const [dateError, setDateError] = useState(null);

  const handleDateChange = (newValue) => {
    handleInputChange({
      target: { name: "appointmentDateTime", value: newValue },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User data is not available.");
      return;
    }
    createAppointment(formState)
      .unwrap()
      .then(() => {
        // Handle success (e.g., show a success message, reset form, etc.)
        console.log("Appointment booked successfully!");
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error(error);
      });
  };

  const disableMonday = (date) => {
    return date.day() === 1;
  };

  const disableTime = (timeValue) => {
    const hour = timeValue.hour();
    const minute = timeValue.minute();
    if (hour < 10 || hour > 19) {
      return true;
    }
    if (minute % 30 !== 0) {
      return true;
    }
    return false;
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Create Appointment</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={formState.firstName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={formState.lastName}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="contactNumber"
              label="Contact Number"
              value={formState.contactNumber}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              value={formState.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker
              label="Date and Time"
              value={formState.appointmentDateTime}
              onChange={handleDateChange}
              shouldDisableDate={disableMonday}
              shouldDisableTime={disableTime}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required
                  error={!!dateError}
                  helperText={dateError}
                />
              )}
              onError={(newError) => setDateError(newError)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Preferred Hairdresser</InputLabel>
              <Select
                name="preferredHairdresser"
                label="Preferred Hairdresser"
                value={formState.preferredHairdresser}
                onChange={handleInputChange}
              >
                <MenuItem value="Hairdresser 1">Hairdresser 1</MenuItem>
                <MenuItem value="Hairdresser 2">Hairdresser 2</MenuItem>
                <MenuItem value="Hairdresser 3">Hairdresser 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Type of Service</InputLabel>
              <Select
                name="serviceType"
                label="Type of Service"
                value={formState.serviceType}
                onChange={handleInputChange}
              >
                <MenuItem value="Service 1">Service 1</MenuItem>
                <MenuItem value="Service 2">Service 2</MenuItem>
                <MenuItem value="Service 3">Service 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="additionalNotes"
              label="Additional Notes/Instructions"
              value={formState.additionalNotes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </Grid>
          {isError && (
            <Grid item xs={12}>
              <Typography color="error">
                Error occurred while booking the appointment
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
