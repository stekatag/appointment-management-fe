/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchAppointmentsByUserQuery } from "../services/api/appointmentsApi";
import {
  useFetchReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../services/api/reviewsApi";
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
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";

const ReviewForm = ({ reviewToEdit }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAppointment } = location.state || {};

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(
    reviewToEdit?.appointmentId || selectedAppointment || ""
  );
  const [appointmentData, setAppointmentData] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: reviewToEdit?.rating || 0,
      title: reviewToEdit?.title || "",
      text: reviewToEdit?.text || "",
    },
  });

  const { data: reviewsData = {} } = useFetchReviewsQuery();
  const { data: pastAppointments = {}, isLoading: isLoadingAppointments } =
    useFetchAppointmentsByUserQuery(user?.id);

  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();

  const reviews = reviewsData.results || [];

  // Filter out already reviewed appointments
  const reviewedAppointmentIds = reviews.map(
    (review) => review.appointmentId.id || review.appointmentId
  );
  const availableAppointments =
    pastAppointments.results?.filter(
      (appointment) => !reviewedAppointmentIds.includes(appointment.id)
    ) || [];

  useEffect(() => {
    if (reviewToEdit && pastAppointments?.results) {
      const appointmentIdFromReview =
        reviewToEdit.appointmentId.id || reviewToEdit.appointmentId;

      const selectedAppointmentData = pastAppointments.results.find(
        (appointment) => appointment.id === appointmentIdFromReview
      );

      setAppointmentData(selectedAppointmentData);

      if (selectedAppointmentData) {
        setValue("rating", reviewToEdit.rating);
        setValue("title", reviewToEdit.title);
        setValue("text", reviewToEdit.text);
        setSelectedAppointmentId(selectedAppointmentData.id);
      }
    } else if (selectedAppointmentId && pastAppointments?.results) {
      const selectedAppointmentData = pastAppointments.results.find(
        (appointment) => appointment.id === selectedAppointmentId
      );
      setAppointmentData(selectedAppointmentData);
    }
  }, [
    selectedAppointmentId,
    pastAppointments?.results,
    setValue,
    reviewToEdit,
  ]);

  const onSubmit = async (data) => {
    if (!appointmentData) {
      setAlert({
        type: "error",
        message: "Please select a valid appointment.",
      });
      return;
    }

    const reviewData = {
      rating: data.rating,
      title: data.title,
      text: data.text,
    };

    try {
      let alertMessage = "";

      if (reviewToEdit) {
        await updateReview({
          id: reviewToEdit.id,
          ...reviewData,
        }).unwrap();
        alertMessage = "Review updated successfully!";
      } else {
        const fullReviewData = {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          barberId: appointmentData.preferredHairdresser,
          serviceType: appointmentData.serviceType,
          appointmentDateTime: appointmentData.appointmentDateTime,
          date: new Date().toISOString(),
          appointmentId: selectedAppointmentId, // Include the appointmentId
          ...reviewData,
        };
        await createReview(fullReviewData).unwrap();
        alertMessage = "Review created successfully!";
      }

      navigate("/reviews", {
        state: { alert: { type: "success", message: alertMessage } },
      });
      reset();
    } catch (error) {
      setAlert({ type: "error", message: `Error occurred: ${error.message}` });
    }
  };

  if (isLoadingAppointments) return <CircularProgress disableShrink />;

  if (!Array.isArray(pastAppointments?.results)) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Failed to load past appointments.
      </Alert>
    );
  }

  if (availableAppointments.length === 0 && !reviewToEdit) {
    return (
      <Alert severity="warning">
        <AlertTitle>No Available Appointments</AlertTitle>
        You have no past appointments available for review.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {reviewToEdit ? "Edit Review" : "Write a Review"}
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
        {!reviewToEdit && availableAppointments.length > 0 && (
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.appointment}>
              <InputLabel>Select Past Appointment</InputLabel>
              <Controller
                name="appointment"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Select Past Appointment"
                    value={selectedAppointmentId}
                    onChange={(e) => setSelectedAppointmentId(e.target.value)}
                    disabled={!!reviewToEdit}
                  >
                    {availableAppointments.map((appointment) => (
                      <MenuItem key={appointment.id} value={appointment.id}>
                        {dayjs(appointment.appointmentDateTime).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.appointment && (
                <Typography color="error">
                  {errors.appointment.message}
                </Typography>
              )}
            </FormControl>
          </Grid>
        )}
        {appointmentData && (
          <>
            <Grid item xs={12}>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={parseFloat(field.value)}
                    onChange={(_, value) => field.onChange(value)}
                    max={5}
                    required
                  />
                )}
              />
              {errors.rating && (
                <Typography color="error">{errors.rating.message}</Typography>
              )}
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
                    required
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Review"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    error={!!errors.text}
                    helperText={errors.text ? errors.text.message : ""}
                  />
                )}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating || isUpdating}
            >
              {reviewToEdit ? "Update Review" : "Submit Review"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/reviews")}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewForm;
