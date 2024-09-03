import PropTypes from "prop-types";
import { useHandleSectionLink } from "../../utils/navigationUtils";
import { Box, Grid } from "@mui/material";
import {
  ViewServicesButton,
  BookNowBox,
  BookNowGridContainer,
  BookNowTitle,
  BookNowSubtitle,
  BookNowContainer,
} from "./BookNowCTASection.styles";

BookNowCTASection.propTypes = {
  backgroundColor: PropTypes.string,
};

export default function BookNowCTASection({ backgroundColor = "default" }) {
  const handleCTAClick = useHandleSectionLink();

  return (
    <Box
      sx={{
        backgroundColor:
          backgroundColor === "default"
            ? (theme) => theme.palette.background.default
            : backgroundColor,
      }}
    >
      <BookNowContainer maxWidth="lg">
        <BookNowBox>
          <BookNowGridContainer container>
            <Grid item>
              <BookNowTitle variant="h4" component="h4" gutterBottom>
                Book an appointment today
              </BookNowTitle>
              <BookNowSubtitle variant="subtitle1">
                Booking an appointment online is the quickest and easiest way to
                schedule.
              </BookNowSubtitle>
            </Grid>
            <Grid item>
              <ViewServicesButton
                variant="contained"
                onClick={() => handleCTAClick("booking-section", "/")}
              >
                Book Now
              </ViewServicesButton>
            </Grid>
          </BookNowGridContainer>
        </BookNowBox>
      </BookNowContainer>
    </Box>
  );
}
