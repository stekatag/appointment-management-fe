import {
  Container,
  Grid,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
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

const testimonials = [
  {
    name: "Richard D.",
    text: "Luxury Barber",
    description:
      "Dignissim per dis dignissim mi nibh a parturient habitasse suspendisse ut a feugiat morbi neque tortor. Tellus volutpat scelerisque tempor.",
    avatar: "path/to/avatar1.jpg",
  },
  {
    name: "Mark S.",
    text: "Professional",
    description:
      "Dignissim per dis dignissim mi nibh a parturient habitasse suspendisse ut a feugiat morbi neque tortor. Tellus volutpat scelerisque tempor.",
    avatar: "path/to/avatar2.jpg",
  },
  {
    name: "Alex L.",
    text: "Great Service",
    description:
      "Dignissim per dis dignissim mi nibh a parturient habitasse suspendisse ut a feugiat morbi neque tortor. Tellus volutpat scelerisque tempor.",
    avatar: "path/to/avatar3.jpg",
  },
];

export default function TestimonialsSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleCTAClick = useHandleSectionLink();

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
          <TestimonialCardsContainer container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <TestimonialCard>
                  <TestimonialNameContent>
                    <Typography variant="subtitle2">
                      {testimonial.name}
                    </Typography>
                    <TestimonialRatingContainer>
                      <Rating name="read-only" value={5} readOnly />
                      <Typography variant="body2" color="textSecondary">
                        2 weeks ago
                      </Typography>
                    </TestimonialRatingContainer>
                  </TestimonialNameContent>
                  <TestimonialContent>
                    <Typography variant="h6">{testimonial.text}</Typography>
                    <TestimonialDescription variant="body2">
                      {testimonial.description}
                    </TestimonialDescription>
                  </TestimonialContent>
                </TestimonialCard>
              </Grid>
            ))}
          </TestimonialCardsContainer>
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
