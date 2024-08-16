import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import StyledSlot from "./AppointmentCalendar.styles";
import PropTypes from "prop-types";

AppointmentCalendar.propTypes = {
  appointments: PropTypes.array.isRequired,
  onSlotSelect: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  initialSlot: PropTypes.string,
  selectedBarber: PropTypes.string.isRequired, // Accept selectedBarber as a prop
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
  initialSlot,
  selectedBarber, // Use selectedBarber here
}) {
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || null);

  // Reset selectedSlot whenever selectedDay changes, unless the selectedDay matches the day of initialSlot
  useEffect(() => {
    if (initialSlot) {
      const initialSlotDay = dayjs(selectedDay).isSame(dayjs(), "day");
      if (initialSlotDay) {
        setSelectedSlot(initialSlot); // initialSlot is already in HH:mm format
      } else {
        setSelectedSlot(null);
      }
    } else {
      setSelectedSlot(null); // Clear the selectedSlot when selectedBarber changes or initialSlot is not provided
    }
  }, [selectedDay, initialSlot, selectedBarber]);

  // Set initial slot when the component first mounts or when initialSlot changes
  useEffect(() => {
    if (initialSlot) {
      setSelectedSlot(initialSlot); // initialSlot is already in HH:mm format
    }
  }, [initialSlot]);

  const isSlotBooked = (time) => {
    return appointments.some(
      (appt) =>
        dayjs(appt.appointmentDateTime).isSame(
          dayjs(selectedDay)
            .hour(time.split(":")[0])
            .minute(time.split(":")[1]),
          "minute"
        ) && appt.preferredHairdresser === selectedBarber // Match the selectedBarber with the appointment's hairdresser
    );
  };

  const isSlotInPast = (time) => {
    const slotDateTime = dayjs(selectedDay)
      .hour(time.split(":")[0])
      .minute(time.split(":")[1]);
    return slotDateTime.isBefore(dayjs());
  };

  const handleSlotClick = (time) => {
    if (!isSlotBooked(time) && !isSlotInPast(time)) {
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
    <Grid container spacing={2} mb={2}>
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
              disabled={isSlotBooked(time) || isSlotInPast(time)}
            >
              <Typography mr={1} variant="h6">
                {time}
              </Typography>
              <Typography variant="body2">
                {isSlotBooked(time)
                  ? "Booked"
                  : isSlotInPast(time)
                  ? "Past Slot"
                  : "Open Slot"}
              </Typography>
            </Button>
          </StyledSlot>
        </Grid>
      ))}
    </Grid>
  );
}
