import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";
import PropTypes from "prop-types";

DaySlider.propTypes = {
  currentDay: PropTypes.object.isRequired,
  setCurrentDay: PropTypes.func.isRequired,
};

export default function DaySlider({ currentDay, setCurrentDay }) {
  const isAfterToday = currentDay.isAfter(dayjs(), "day");

  const handlePreviousDay = () => {
    if (isAfterToday) {
      setCurrentDay(currentDay.subtract(1, "day"));
    }
  };

  const handleNextDay = () => {
    setCurrentDay(currentDay.add(1, "day"));
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      {isAfterToday ? (
        <IconButton onClick={handlePreviousDay}>
          <ArrowBack />
        </IconButton>
      ) : (
        <div style={{ width: "48px" }} /> // Placeholder to center the date
      )}
      <Typography variant="h6">
        {currentDay.format("dddd, DD MMMM YYYY")}
      </Typography>
      <IconButton onClick={handleNextDay}>
        <ArrowForward />
      </IconButton>
    </Grid>
  );
}
