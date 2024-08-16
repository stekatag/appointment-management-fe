import { Container, Grid, Typography } from "@mui/material";
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
import PersonIcon from "@mui/icons-material/Person";

const barbersData = [
  {
    name: "NEAL LEYTON",
    title: "MASTER BARBER",
    image:
      "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/barber1.jpg",
    phone: "+359 888 888 888",
  },
  {
    name: "BRUCE SUTTON",
    title: "HAIRDRESSER",
    image:
      "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/barber2.jpg",
    phone: "+359 123 456 789",
  },
  {
    name: "JAMES HARRIS",
    title: "BARBER",
    image: "https://i.ibb.co/JsWSZHS/barber3.jpg",
    phone: "+359 987 654 321",
  },
  {
    name: "JOHN DOE",
    title: "BARBER",
    image: "https://i.ibb.co/LCHKrW3/barber4.jpg",
    phone: "+359 123 123 123",
  },
];

export default function BarbersSection() {
  return (
    <BarbersContainer>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h3" align="center" gutterBottom>
          Our Skilled Barbers
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Combining traditional techniques with modern styles, providing cut,
          color, and shave services.
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {barbersData.map((barber, index) => (
            <Grid item xs={12} md={6} key={index}>
              <BarberCard>
                <BarberImage>
                  <img src={barber.image} alt={barber.name} />
                </BarberImage>
                <BarberInfo>
                  <Typography component="h4" variant="h6" gutterBottom>
                    {barber.name}
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
                        <StyledLink to={`tel:${barber.phone}`}>
                          {barber.phone}
                        </StyledLink>
                      </Typography>
                    </ContactInfoInner>
                    <ContactInfoInner>
                      <ContactIcon>
                        <PersonIcon />
                      </ContactIcon>
                      <Typography variant="body2" color="textSecondary">
                        <StyledLink to={`/barbers/${barber.name}`}>
                          View Profile
                        </StyledLink>
                      </Typography>
                    </ContactInfoInner>
                  </ContactInfo>
                </BarberInfo>
              </BarberCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </BarbersContainer>
  );
}
