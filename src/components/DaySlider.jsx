import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PropTypes from "prop-types";

DaySlider.propTypes = {
  currentDay: PropTypes.object.isRequired,
  setCurrentDay: PropTypes.func.isRequired,
};

export default function DaySlider({ currentDay, setCurrentDay }) {
  const handlePreviousDay = () => {
    setCurrentDay(currentDay.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setCurrentDay(currentDay.add(1, "day"));
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 3 }}
    >
      <IconButton onClick={handlePreviousDay}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6">{currentDay.format("DD MMMM YYYY")}</Typography>
      <IconButton onClick={handleNextDay}>
        <ArrowForward />
      </IconButton>
    </Grid>
  );
}
