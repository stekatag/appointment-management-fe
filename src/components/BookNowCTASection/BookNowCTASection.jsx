import { Grid, Link } from "@mui/material";
import {
  ViewServicesButton,
  BookNowBox,
  BookNowGridContainer,
  BookNowTitle,
  BookNowSubtitle,
  BookNowContainer,
} from "./BookNowCTASection.styles";

export default function BookNowCTASection() {
  return (
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
            <Link href="#booking-section" underline="none">
              <ViewServicesButton variant="contained">
                Book Now
              </ViewServicesButton>
            </Link>
          </Grid>
        </BookNowGridContainer>
      </BookNowBox>
    </BookNowContainer>
  );
}
