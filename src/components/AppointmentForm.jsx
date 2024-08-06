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
  TextareaAutosize,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";

const AppointmentForm = () => {
  const user = useSelector((state) => state.auth.user);

  const [formState, handleInputChange] = useForm({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    contactNumber: "",
    email: user ? user.email : "",
    appointmentDate: null,
    appointmentTime: null,
    preferredHairdresser: "",
    serviceType: "",
    additionalNotes: "",
    userId: user ? user.id : null,
  });

  const [createAppointment, { isLoading, isError }] =
    useCreateAppointmentMutation();

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
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error(error);
      });
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        name="firstName"
        label="First Name"
        value={formState.firstName}
        onChange={handleInputChange}
        fullWidth
        required
        disabled
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={formState.lastName}
        onChange={handleInputChange}
        fullWidth
        required
        disabled
      />
      <TextField
        name="contactNumber"
        label="Contact Number"
        value={formState.contactNumber}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        name="email"
        label="Email"
        value={formState.email}
        onChange={handleInputChange}
        fullWidth
        required
        disabled
      />
      <DatePicker
        label="Date of Appointment"
        value={formState.appointmentDate}
        onChange={(date) =>
          handleInputChange({
            target: { name: "appointmentDate", value: date },
          })
        }
        renderInput={(params) => <TextField {...params} fullWidth required />}
      />
      <TimePicker
        label="Time of Appointment"
        value={formState.appointmentTime}
        onChange={(time) =>
          handleInputChange({
            target: { name: "appointmentTime", value: time },
          })
        }
        renderInput={(params) => <TextField {...params} fullWidth required />}
      />
      <FormControl fullWidth required>
        <InputLabel>Preferred Hairdresser</InputLabel>
        <Select
          name="preferredHairdresser"
          value={formState.preferredHairdresser}
          onChange={handleInputChange}
        >
          <MenuItem value="Hairdresser 1">Hairdresser 1</MenuItem>
          <MenuItem value="Hairdresser 2">Hairdresser 2</MenuItem>
          <MenuItem value="Hairdresser 3">Hairdresser 3</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel>Type of Service</InputLabel>
        <Select
          name="serviceType"
          value={formState.serviceType}
          onChange={handleInputChange}
        >
          <MenuItem value="Service 1">Service 1</MenuItem>
          <MenuItem value="Service 2">Service 2</MenuItem>
          <MenuItem value="Service 3">Service 3</MenuItem>
        </Select>
      </FormControl>
      <TextareaAutosize
        name="additionalNotes"
        placeholder="Additional Notes/Instructions"
        value={formState.additionalNotes}
        onChange={handleInputChange}
        minRows={3}
        style={{ width: "100%", marginTop: "1em" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Booking..." : "Book Appointment"}
      </Button>
      {isError && <p>Error occurred while booking the appointment</p>}
    </Box>
  );
};

export default AppointmentForm;
