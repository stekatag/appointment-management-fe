/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import {
  AboutUsContainer,
  AccordionItem,
  AccordionIcon,
  AccordionTitle,
  AccordionContent,
  StyledAccordion,
  AboutUsTitle,
  AboutImageContainer,
  AboutImageInnerContainer,
  AboutImage,
} from "./AboutUsSection.styles";

export default function AboutUsSection() {
  return (
    <AboutUsContainer>
      <Container maxWidth="lg">
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <Grid
            container
            alignItems="start"
            justifyContent="center"
            spacing={3}
          >
            <Grid item xs={12} md={7}>
              <AboutUsTitle variant="h3" component="h3">
                Who We Are
              </AboutUsTitle>
              <Box mt={3}>
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                  gutterBottom
                >
                  Welcome to The Barber Shop - not just a barbershop, but a real
                  space for men and for a good time. For us, shaving is not just
                  a grooming process, but a complete ritual combining the art of
                  grooming, small details, and the atmosphere of the men's
                  community.
                </Typography>
                <AboutImageContainer>
                  <AboutImageInnerContainer>
                    <AboutImage
                      component="img"
                      src="https://i.ibb.co/vvg1qxp/428612208-18398510014067847-642022535715903623-n-e1708709153973-1024x658.jpg"
                    />
                  </AboutImageInnerContainer>
                </AboutImageContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <AccordionItem>
                <StyledAccordion defaultExpanded>
                  <AccordionSummary expandIcon={<AccordionIcon />}>
                    <AccordionTitle component="h4">
                      1. Our Mission
                    </AccordionTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionContent variant="body1">
                      Founded in 2014, we are the first Western-style barbershop
                      in Sofia that offers more than just a haircut service. For
                      us, it's a place where men don't just get a stylish
                      haircut, but also feel part of a cozy community.
                    </AccordionContent>
                  </AccordionDetails>
                </StyledAccordion>
              </AccordionItem>
              <AccordionItem>
                <StyledAccordion>
                  <AccordionSummary expandIcon={<AccordionIcon />}>
                    <AccordionTitle variant="h5">
                      2. Our Objectives
                    </AccordionTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionContent variant="body1">
                      The name The Barber Shop was not chosen by chance. We're
                      not just a barbershop, we're THE BARBERSHOP - the place
                      where style and experience come together. In our
                      barbershop, we cross traditional barbering techniques with
                      modern innovations, creating not only a perfect appearance
                      but also satisfaction for the soul.
                    </AccordionContent>
                  </AccordionDetails>
                </StyledAccordion>
              </AccordionItem>
              <AccordionItem>
                <StyledAccordion>
                  <AccordionSummary expandIcon={<AccordionIcon />}>
                    <AccordionTitle variant="h5">3. Our People</AccordionTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionContent variant="body1">
                      Our experienced barbers do not only care about the look
                      but also about the comfort of each client. At The Barber
                      Shop, we believe in combining tradition and innovation.
                      Here you don't just get a haircut - here you can enjoy a
                      real men's experience.
                    </AccordionContent>
                  </AccordionDetails>
                </StyledAccordion>
              </AccordionItem>
            </Grid>
          </Grid>
        </ScrollAnimation>
      </Container>
    </AboutUsContainer>
  );
}
