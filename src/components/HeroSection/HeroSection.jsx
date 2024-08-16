import { Link } from "@mui/material";
import {
  HeroSectionContainer,
  ContentContainer,
  MainTitle,
  SubTitle,
  HeroButton,
} from "./HeroSection.styles";
import ScrollAnimation from "react-animate-on-scroll";

export default function HeroSection() {
  return (
    <HeroSectionContainer>
      <ContentContainer maxWidth="md">
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <MainTitle variant="h1" component="h1">
            Experience the traditional barbershop feel
          </MainTitle>
          <SubTitle variant="h3" component="h3">
            Professional care to maintain your perfect look
          </SubTitle>
          <Link href="#video-section" underline="none">
            <HeroButton variant="outlined">Learn More</HeroButton>
          </Link>
          <Link href="#booking-section" underline="none">
            <HeroButton variant="contained">Book Now</HeroButton>
          </Link>
        </ScrollAnimation>
      </ContentContainer>
    </HeroSectionContainer>
  );
}
