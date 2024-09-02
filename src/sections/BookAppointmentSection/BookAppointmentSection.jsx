import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchAppointmentsByDayAndBarberQuery } from "../../services/api/appointmentsApi";
import { useFetchBarbersQuery } from "../../services/api/barbersApi";
import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Grid,
  FormControl,
  Fade,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import DaySlider from "../../components/DaySlider";
import ServerAlert from "../../components/ServerAlert/ServerAlert";
import {
  SectionContainer,
  StyledButton,
} from "./BookAppointmentSection.styles";

export default function BookAppointmentSection() {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();

  const { data: barbers, error: barberError } = useFetchBarbersQuery();

  const {
    data: dayAppointments = { results: [] },
    refetch: refetchDayAppointments,
    isLoading: isLoadingAppointments,
    error: appointmentError,
  } = useFetchAppointmentsByDayAndBarberQuery(
    { barberId: selectedBarber, page: 1, limit: 1000 },
    { skip: !selectedBarber }
  );

  // Refetch appointments when selectedDay or selectedBarber changes
  useEffect(() => {
    if (selectedBarber) {
      refetchDayAppointments();
    }
  }, [selectedDay, selectedBarber, refetchDayAppointments]);

  const handleBarberChange = (value) => {
    setSelectedBarber(value);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (time) => {
    setSelectedSlot(time);
  };

  return (
    <SectionContainer id="booking-section">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h3" align="center" gutterBottom>
              Book an Appointment
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {barberError ? (
              <ServerAlert keyword="barbers" />
            ) : (
              <FormControl fullWidth required>
                <InputLabel>Preferred Hairdresser</InputLabel>
                <Select
                  label="Preferred Hairdresser"
                  value={selectedBarber}
                  onChange={(e) => handleBarberChange(e.target.value)}
                >
                  {barbers?.results?.map((barber) => (
                    <MenuItem key={barber.id} value={barber.id}>
                      {`${barber.firstName} ${barber.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
        {/* Conditionally render DaySlider and AppointmentCalendar with a fade transition */}
        {selectedBarber && (
          <Fade in={Boolean(selectedBarber)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DaySlider
                  currentDay={selectedDay}
                  setCurrentDay={setSelectedDay}
                />
              </Grid>
              <Grid item xs={12}>
                {isLoadingAppointments ? (
                  <CircularProgress />
                ) : appointmentError ? (
                  <ServerAlert keyword="appointments" />
                ) : (
                  <AppointmentCalendar
                    appointments={dayAppointments.results}
                    onSlotSelect={handleSlotSelect}
                    selectedDay={selectedDay}
                    selectedBarber={selectedBarber}
                    initialSlot={
                      selectedSlot ? dayjs(selectedSlot).format("HH:mm") : null
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate("/appointments/create", {
                      state: { selectedSlot, selectedBarber },
                    })
                  }
                  disabled={!selectedSlot || !selectedBarber}
                >
                  Book Now
                </StyledButton>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Container>
    </SectionContainer>
  );
}
