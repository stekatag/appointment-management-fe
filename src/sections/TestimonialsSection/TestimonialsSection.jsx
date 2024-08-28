import {
  Container,
  Grid,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  TestimonialsContainer,
  TestimonialCard,
  TestimonialContent,
  TestimonialCardsContainer,
  TitlesContainer,
  TestimonialRatingContainer,
  TestimonialNameContent,
  CTAButton,
  TestimonialDescription,
} from "./TestimonialsSection.styles";
import ScrollAnimation from "react-animate-on-scroll";
import { useHandleSectionLink } from "../../utils/navigationUtils";
import { useFetchReviewsQuery } from "../../services/api/reviewsApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ServerAlert from "../../components/ServerAlert/ServerAlert";

dayjs.extend(relativeTime);

export default function TestimonialsSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleCTAClick = useHandleSectionLink();

  // Fetch the reviews from the database
  const { data: reviews = [], isLoading, isError } = useFetchReviewsQuery();

  // Filter reviews with rating 4 or higher and sort by date (most recent first)
  const topRatedReviews = reviews?.results
    ?.filter((review) => review.rating >= 4)
    .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))
    .slice(0, 3); // Get the three most recent top-rated reviews

  if (isError) {
    return (
      <TestimonialsContainer>
        <Container maxWidth="lg">
          <ServerAlert keyword="reviews" />
        </Container>
      </TestimonialsContainer>
    );
  }

  return (
    <TestimonialsContainer>
      <Container maxWidth="lg">
        <ScrollAnimation
          animateIn={isSmallScreen ? "fadeIn" : "fadeInRightBig"}
          animateOnce
        >
          <TitlesContainer>
            <Typography variant="h3" align="center" gutterBottom>
              Testimonials
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              We are very proud of the service we provide and stand by every
              product we carry. Read our testimonials from our happy customers.
            </Typography>
          </TitlesContainer>

          {/* Check if there are any top-rated reviews */}
          {topRatedReviews?.length > 0 ? (
            <TestimonialCardsContainer
              container
              spacing={4}
              justifyContent={
                topRatedReviews.length < 3 ? "center" : "flex-start"
              }
            >
              {topRatedReviews.map((review, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard>
                    <TestimonialNameContent>
                      <Typography variant="subtitle2">{review.name}</Typography>
                      <TestimonialRatingContainer>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(review.date).fromNow()}
                        </Typography>
                      </TestimonialRatingContainer>
                    </TestimonialNameContent>
                    <TestimonialContent>
                      <Typography variant="h6">{review.title}</Typography>
                      <TestimonialDescription variant="body2">
                        {review.text}
                      </TestimonialDescription>
                    </TestimonialContent>
                  </TestimonialCard>
                </Grid>
              ))}
            </TestimonialCardsContainer>
          ) : (
            <Grid item xs={12}>
              <Alert severity="warning">
                There are no top-rated reviews available at the moment.
              </Alert>
            </Grid>
          )}
          {isLoading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}

          <CTAButton
            onClick={() => handleCTAClick("reviews-section", "/barbers")}
            variant="contained"
          >
            See all Reviews
          </CTAButton>
        </ScrollAnimation>
      </Container>
    </TestimonialsContainer>
  );
}
