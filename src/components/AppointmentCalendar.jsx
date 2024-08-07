import { useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import dayjs from "dayjs";

const slots = [];

for (let hour = 10; hour <= 19; hour++) {
  for (let minute = 0; minute <= 30; minute += 30) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );
  }
}

const AppointmentCalendar = ({ appointments, onSlotSelect, selectedDay }) => {
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
    <Grid container spacing={2}>
      {slots.map((time) => (
        <Grid item xs={3} key={time}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: "center",
              backgroundColor: isSlotBooked(time)
                ? "#ccc"
                : selectedSlot === time
                ? "#90caf9"
                : "#fff",
            }}
          >
            <Button
              fullWidth
              variant="text"
              onClick={() => handleSlotClick(time)}
              disabled={isSlotBooked(time)}
            >
              <Typography variant="h6">{time}</Typography>
              <Typography variant="body2">
                {isSlotBooked(time) ? "Booked" : "Open Slot"}
              </Typography>
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppointmentCalendar;
