import { useState, useEffect } from "react";
import { useFetchAppointmentsByDayAndBarberQuery } from "../../services/api";
import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Grid,
  FormControl,
  Fade,
} from "@mui/material";
import dayjs from "dayjs";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import DaySlider from "../../components/DaySlider";
import {
  SectionContainer,
  StyledButton,
} from "./BookAppointmentSection.styles";
import { useNavigate } from "react-router-dom";

export default function BookAppointmentSection() {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();

  const { data: dayAppointments, refetch: refetchDayAppointments } =
    useFetchAppointmentsByDayAndBarberQuery(
      {
        day: selectedDay.format("YYYY-MM-DD"),
        barber: selectedBarber,
      },
      { skip: !selectedDay || !selectedBarber }
    );

  useEffect(() => {
    if (selectedDay && selectedBarber) {
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
            <FormControl fullWidth required>
              <InputLabel>Preferred Hairdresser</InputLabel>
              <Select
                label="Preferred Hairdresser"
                value={selectedBarber}
                onChange={(e) => handleBarberChange(e.target.value)}
              >
                <MenuItem value="Hairdresser 1">Hairdresser 1</MenuItem>
                <MenuItem value="Hairdresser 2">Hairdresser 2</MenuItem>
                <MenuItem value="Hairdresser 3">Hairdresser 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* Conditionally render DaySlider and AppointmentCalendar with a fade transition */}
        {selectedBarber && (
          <Fade in={selectedBarber !== ""}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DaySlider
                  currentDay={selectedDay}
                  setCurrentDay={setSelectedDay}
                />
              </Grid>
              <Grid item xs={12}>
                <AppointmentCalendar
                  appointments={dayAppointments || []}
                  onSlotSelect={handleSlotSelect}
                  selectedDay={selectedDay}
                  selectedBarber={selectedBarber}
                  initialSlot={
                    selectedSlot ? dayjs(selectedSlot).format("HH:mm") : null
                  }
                />
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
