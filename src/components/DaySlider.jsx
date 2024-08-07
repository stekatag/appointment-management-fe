import { Grid, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const DaySlider = ({ currentDay, setCurrentDay }) => {
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
};

export default DaySlider;
