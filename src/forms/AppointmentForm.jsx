/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByDayAndBarberQuery,
  useFetchServiceCategoriesQuery,
  useFetchServicesQuery,
  useFetchBarbersQuery,
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
  Fade,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppointmentCalendar from "../components/AppointmentCalendar/AppointmentCalendar";
import DaySlider from "../components/DaySlider";

// Validation schema
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
  serviceCategory: yup.string().required("Service category is required"),
  serviceType: yup.string().required("Service type is required"),
  appointmentDateTime: yup
    .string()
    .nullable()
    .required("Please select a time slot"),
});

const AppointmentForm = ({ appointmentToEdit }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSlot, selectedBarber } = location.state || {};

  const [selectedDay, setSelectedDay] = useState(
    selectedSlot ? dayjs(selectedSlot) : dayjs()
  );
  const [slot, setSlot] = useState(selectedSlot || null);
  const [barber, setBarber] = useState(selectedBarber || "");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      contactNumber: user ? user.contactNumber : "",
      email: user ? user.email : "",
      preferredHairdresser: barber,
      serviceCategory: "",
      serviceType: "",
      additionalNotes: "",
      userId: user ? user.id : null,
      appointmentDateTime: slot,
    },
  });

  const { data: categories = [] } = useFetchServiceCategoriesQuery();
  const { data: services = [] } = useFetchServicesQuery();
  const { data: barbers = [] } = useFetchBarbersQuery();

  const [createAppointment, { isLoading: isCreating }] =
    useCreateAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating }] =
    useUpdateAppointmentMutation();
  const { data: userAppointments, isLoading: isLoadingUserAppointments } =
    useFetchAppointmentsByUserQuery(user ? user.id : null);

  const { data: dayAppointments, refetch: refetchDayAppointments } =
    useFetchAppointmentsByDayAndBarberQuery(
      { day: selectedDay.format("YYYY-MM-DD"), barber: barber },
      { skip: !selectedDay || !barber }
    );

  useEffect(() => {
    if (selectedDay && barber) {
      refetchDayAppointments();
    }
  }, [selectedDay, barber, refetchDayAppointments]);

  useEffect(() => {
    if (appointmentToEdit) {
      const {
        firstName,
        lastName,
        contactNumber,
        email,
        preferredHairdresser,
        serviceType,
        serviceCategory,
        additionalNotes,
        appointmentDateTime,
      } = appointmentToEdit;

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("contactNumber", contactNumber);
      setValue("email", email);
      setValue("preferredHairdresser", preferredHairdresser);
      setValue("serviceType", serviceType);
      setValue("serviceCategory", serviceCategory);
      setValue("additionalNotes", additionalNotes);
      setSelectedDay(dayjs(appointmentDateTime));
      setSlot(dayjs(appointmentDateTime).toISOString());
      setValue("appointmentDateTime", dayjs(appointmentDateTime).toISOString());
      setBarber(preferredHairdresser);
      setSelectedCategory(serviceCategory);
    } else if (selectedBarber || selectedSlot) {
      setValue("preferredHairdresser", selectedBarber);
      setValue("appointmentDateTime", selectedSlot);
    }
  }, [appointmentToEdit, selectedBarber, selectedSlot, setValue]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = services.filter(
        (service) => service.category === selectedCategory
      );
      setFilteredServices(filtered);
    }
  }, [selectedCategory, services]);

  const handleSlotSelect = (time) => {
    setSlot(time);
    setValue("appointmentDateTime", time);
  };

  const handleBarberChange = (value) => {
    setBarber(value);
    setSlot(null);
    setValue("appointmentDateTime", null);
    setValue("preferredHairdresser", value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue("serviceCategory", value); // Ensure the selected category is properly set
    setValue("serviceType", ""); // Clear serviceType when changing category
  };

  const getButtonText = (isCreating, isUpdating, appointmentToEdit) => {
    if (isCreating || isUpdating) {
      return "Submitting...";
    } else if (appointmentToEdit) {
      return "Update Appointment";
    } else {
      return "Book Appointment";
    }
  };

  const onSubmit = async (data) => {
    const appointmentData = {
      ...data,
      appointmentDateTime: slot,
    };

    try {
      let alertMessage = "";

      if (appointmentToEdit) {
        await updateAppointment({
          id: appointmentToEdit.id,
          ...appointmentData,
        }).unwrap();
        alertMessage = "Appointment updated successfully!";
      } else {
        await createAppointment(appointmentData).unwrap();
        alertMessage = "Appointment booked successfully!";
      }

      // Navigate to the appointments route with the alert message
      navigate("/appointments", {
        state: { alert: { type: "success", message: alertMessage } },
      });

      // Reset all fields to their default values
      reset({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        preferredHairdresser: "",
        serviceCategory: "",
        serviceType: "",
        additionalNotes: "",
        appointmentDateTime: null,
      });
      setBarber("");
      setSelectedCategory("");
      setSlot(null);
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
      <Grid container spacing={2} sx={{ mb: 2 }}>
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
          <FormControl fullWidth required error={!!errors.preferredHairdresser}>
            <InputLabel>Preferred Hairdresser</InputLabel>
            <Controller
              name="preferredHairdresser"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Preferred Hairdresser"
                  value={barber}
                  onChange={(e) => handleBarberChange(e.target.value)}
                >
                  {barbers.map((barber) => (
                    <MenuItem key={barber.id} value={barber.id}>
                      {`${barber.firstName} ${barber.lastName}`}
                    </MenuItem>
                  ))}
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
      </Grid>

      <Fade in={!!barber}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.serviceCategory}>
              <InputLabel>Service Category</InputLabel>
              <Controller
                name="serviceCategory"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Service Category"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.serviceCategory && (
                <Typography color="error">
                  {errors.serviceCategory.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {!!selectedCategory && (
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.serviceType}>
                <InputLabel>Type of Service</InputLabel>
                <Controller
                  name="serviceType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Type of Service">
                      {filteredServices.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.title}
                        </MenuItem>
                      ))}
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
          )}

          <Grid item xs={12}>
            <DaySlider
              currentDay={selectedDay}
              setCurrentDay={setSelectedDay}
            />
          </Grid>
          <Grid item xs={12}>
            <AppointmentCalendar
              appointments={appointments}
              onSlotSelect={handleSlotSelect}
              selectedDay={selectedDay}
              selectedBarber={barber}
              initialSlot={slot ? dayjs(slot).format("HH:mm") : null}
            />
            {errors.appointmentDateTime && (
              <Typography color="error">
                {errors.appointmentDateTime.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isCreating || isUpdating}
              >
                {getButtonText(isCreating, isUpdating, appointmentToEdit)}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/appointments")}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
};

export default AppointmentForm;
