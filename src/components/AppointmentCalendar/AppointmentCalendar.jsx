import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import StyledSlot from "./AppointmentCalendar.styles";
import PropTypes from "prop-types";

AppointmentCalendar.propTypes = {
  appointments: PropTypes.array.isRequired,
  onSlotSelect: PropTypes.func.isRequired,
  selectedDay: PropTypes.string.isRequired,
};

const slots = [];
// Generate time slots from 10:00 to 19:30
for (let hour = 10; hour <= 19; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );
  }
}

export default function AppointmentCalendar({
  appointments,
  onSlotSelect,
  selectedDay,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const isSlotBooked = (time) => {
    return appointments.some((appt) =>
      dayjs(appt.appointmentDateTime).isSame(
        dayjs(selectedDay).hour(time.split(":")[0]).minute(time.split(":")[1]),
        "minute"
      )
    );
  };

  const handleSlotClick = (time) => {
    if (!isSlotBooked(time)) {
      setSelectedSlot(time);
      onSlotSelect(
        dayjs(selectedDay)
          .hour(time.split(":")[0])
          .minute(time.split(":")[1])
          .toISOString()
      );
    }
  };

  return (
    <Grid container spacing={2} mb={5}>
      {slots.map((time) => (
        <Grid item xs={12} sm={6} lg={3} key={time}>
          <StyledSlot
            elevation={3}
            isBooked={isSlotBooked(time)}
            isSelected={selectedSlot === time}
          >
            <Button
              fullWidth
              variant="text"
              onClick={() => handleSlotClick(time)}
              disabled={isSlotBooked(time)}
            >
              <Typography mr={1} variant="h6">
                {time}
              </Typography>
              <Typography variant="body2">
                {isSlotBooked(time) ? "Booked" : "Open Slot"}
              </Typography>
            </Button>
          </StyledSlot>
        </Grid>
      ))}
    </Grid>
  );
}
