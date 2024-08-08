import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useCreateAppointmentMutation,
  useFetchAppointmentsQuery,
} from "../services/api";
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
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppointmentCalendar from "./AppointmentCalendar/AppointmentCalendar";
import DaySlider from "./DaySlider";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, "First name should be at least 2 characters")
    .required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  contactNumber: yup
    .string()
    .trim()
    .matches(
      /^0\d{9}$/,
      "Enter a valid phone number starting with 0 and containing 10 digits"
    )
    .required("Contact number is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  preferredHairdresser: yup
    .string()
    .required("Preferred hairdresser is required"),
  serviceType: yup.string().required("Service type is required"),
});

const AppointmentForm = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      contactNumber: "",
      email: user ? user.email : "",
      preferredHairdresser: "",
      serviceType: "",
      additionalNotes: "",
      userId: user ? user.id : null,
    },
  });

  const [createAppointment, { isLoading, isError }] =
    useCreateAppointmentMutation();
  const { data: appointments, isLoading: isLoadingAppointments } =
    useFetchAppointmentsQuery(user ? user.id : null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelect = (time) => {
    setSelectedSlot(time);
  };

  const onSubmit = async (data) => {
    if (!selectedSlot) {
      setError("appointmentDateTime", {
        type: "manual",
        message: "Please select a time slot",
      });
      return;
    }

    const appointmentData = {
      ...data,
      appointmentDateTime: selectedSlot,
    };

    createAppointment(appointmentData)
      .unwrap()
      .then(() => {
        setAlert({
          type: "success",
          message: "Appointment booked successfully!",
        });
        reset();
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: `Error occurred while booking the appointment: ${error}`,
        });
      });
  };

  if (!user || isLoadingAppointments) {
    return <CircularProgress disableShrink />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Create Appointment</Typography>
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
          <DaySlider currentDay={selectedDay} setCurrentDay={setSelectedDay} />
        </Grid>
        <Grid item xs={12}>
          <AppointmentCalendar
            appointments={appointments}
            onSlotSelect={handleSlotSelect}
            selectedDay={selectedDay}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="contactNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Number"
                fullWidth
                error={!!errors.contactNumber}
                helperText={
                  errors.contactNumber ? errors.contactNumber.message : ""
                }
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!!errors.preferredHairdresser}>
            <InputLabel>Preferred Hairdresser</InputLabel>
            <Controller
              name="preferredHairdresser"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Preferred Hairdresser">
                  <MenuItem value="Hairdresser 1">Hairdresser 1</MenuItem>
                  <MenuItem value="Hairdresser 2">Hairdresser 2</MenuItem>
                  <MenuItem value="Hairdresser 3">Hairdresser 3</MenuItem>
                </Select>
              )}
            />
            {errors.preferredHairdresser && (
              <Typography color="error">
                {errors.preferredHairdresser.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!!errors.serviceType}>
            <InputLabel>Type of Service</InputLabel>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Type of Service">
                  <MenuItem value="Service 1">Service 1</MenuItem>
                  <MenuItem value="Service 2">Service 2</MenuItem>
                  <MenuItem value="Service 3">Service 3</MenuItem>
                </Select>
              )}
            />
            {errors.serviceType && (
              <Typography color="error">
                {errors.serviceType.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="additionalNotes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Additional Notes/Instructions"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />
            )}
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
  );
};

export default AppointmentForm;
