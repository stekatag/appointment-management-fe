/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByDayQuery,
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

const AppointmentForm = ({ appointmentToEdit }) => {
  const user = useSelector((state) => state.auth.user);

  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
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

  const [createAppointment, { isLoading: isCreating }] =
    useCreateAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating }] =
    useUpdateAppointmentMutation();
  const { data: userAppointments, isLoading: isLoadingUserAppointments } =
    useFetchAppointmentsByUserQuery(user ? user.id : null);

  const { data: dayAppointments, refetch: refetchDayAppointments } =
    useFetchAppointmentsByDayQuery(selectedDay.format("YYYY-MM-DD"), {
      skip: !selectedDay,
    });

  useEffect(() => {
    if (selectedDay) {
      refetchDayAppointments();
    }
  }, [selectedDay, refetchDayAppointments]);

  useEffect(() => {
    if (appointmentToEdit) {
      const {
        firstName,
        lastName,
        contactNumber,
        email,
        preferredHairdresser,
        serviceType,
        additionalNotes,
        appointmentDateTime,
      } = appointmentToEdit;

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("contactNumber", contactNumber);
      setValue("email", email);
      setValue("preferredHairdresser", preferredHairdresser);
      setValue("serviceType", serviceType);
      setValue("additionalNotes", additionalNotes);
      setSelectedDay(dayjs(appointmentDateTime));
      setSelectedSlot(dayjs(appointmentDateTime).toISOString());
    }
  }, [appointmentToEdit, setValue]);

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

    try {
      if (appointmentToEdit) {
        await updateAppointment({
          id: appointmentToEdit.id,
          ...appointmentData,
        }).unwrap();
        setAlert({
          type: "success",
          message: "Appointment updated successfully!",
        });
      } else {
        await createAppointment(appointmentData).unwrap();
        setAlert({
          type: "success",
          message: "Appointment booked successfully!",
        });
      }
      reset();
    } catch (error) {
      setAlert({
        type: "error",
        message: `Error occurred while ${
          appointmentToEdit ? "updating" : "booking"
        } the appointment: ${error}`,
      });
    }
  };

  if (!user || isLoadingUserAppointments) {
    return <CircularProgress disableShrink />;
  }

  const appointments = [
    ...(userAppointments || []),
    ...(dayAppointments || []),
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {appointmentToEdit ? "Edit Appointment" : "Create Appointment"}
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
            disabled={isCreating || isUpdating}
            fullWidth
          >
            {isCreating || isUpdating
              ? "Submitting..."
              : appointmentToEdit
              ? "Update Appointment"
              : "Book Appointment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentForm;
