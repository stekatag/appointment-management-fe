import { useNavigate } from "react-router-dom";
import { useFetchBarbersQuery } from "../../services/api";
import { Container, Grid, Typography, Alert, Box, Button } from "@mui/material";
import {
  BarbersContainer,
  BarberCard,
  BarberImage,
  BarberInfo,
  ContactInfo,
  ContactIcon,
  ContactInfoInner,
  StyledLink,
} from "./BarbersSection.styles";
import { Call } from "@mui/icons-material";
import GradeIcon from "@mui/icons-material/Grade";
import ScrollAnimation from "react-animate-on-scroll";

export default function BarbersSection() {
  const { data: barbers = [], isLoading, isError } = useFetchBarbersQuery();
  const navigate = useNavigate();

  // Handle the loading and error states if necessary
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading barbers data.</Typography>;
  }

  return (
    <BarbersContainer>
      <ScrollAnimation animateIn="fadeIn" animateOnce>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h3" align="center" gutterBottom>
            Our Skilled Barbers
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Combining traditional techniques with modern styles, providing cut,
            color, and shave services.
          </Typography>
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            {barbers.length > 0 ? (
              barbers.map((barber) => (
                <Grid item xs={12} md={6} key={barber.id}>
                  <BarberCard>
                    <BarberImage>
                      <img src={barber.image} alt={barber.firstName} />
                    </BarberImage>
                    <BarberInfo>
                      <Typography component="h4" variant="h6" gutterBottom>
                        {barber.firstName} {barber.lastName}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {barber.title}
                      </Typography>
                      <ContactInfo>
                        <ContactInfoInner>
                          <ContactIcon>
                            <Call />
                          </ContactIcon>
                          <Typography variant="body2" color="textSecondary">
                            <StyledLink to={`tel:${barber.contactNumber}`}>
                              {barber.contactNumber}
                            </StyledLink>
                          </Typography>
                        </ContactInfoInner>
                        <ContactInfoInner>
                          <ContactIcon>
                            <GradeIcon />
                          </ContactIcon>
                          <Typography variant="body2" color="textSecondary">
                            <StyledLink to={`/barbers`}>
                              Rate & Review
                            </StyledLink>
                          </Typography>
                        </ContactInfoInner>
                      </ContactInfo>
                    </BarberInfo>
                  </BarberCard>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Alert severity="warning">
                  There are no barbers available in the database.
                </Alert>
              </Grid>
            )}
          </Grid>
        </Container>
      </ScrollAnimation>
    </BarbersContainer>
  );
}
