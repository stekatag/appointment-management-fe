import { Grid } from "@mui/material";
import {
  HeroSectionContainer,
  ContentContainer,
  MainTitle,
  SubTitle,
  HeroButton,
} from "./HeroSection.styles";

export default function HeroSection() {
  return (
    <HeroSectionContainer>
      <ContentContainer maxWidth="md">
        <MainTitle variant="h1" component="h1">
          Experience the traditional barbershop feel
        </MainTitle>
        <SubTitle variant="h3" component="h3">
          Professional care to maintain your perfect look
        </SubTitle>
        <Grid container justifyContent="center">
          <HeroButton variant="outlined">Read More</HeroButton>
          <HeroButton variant="contained">Book Now</HeroButton>
        </Grid>
      </ContentContainer>
    </HeroSectionContainer>
  );
}
