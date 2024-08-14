import { Container, Grid, Typography, IconButton } from "@mui/material";
import {
  BarbersContainer,
  BarberCard,
  BarberImage,
  BarberInfo,
  SocialIcons,
  ContactButton,
} from "./BarbersSection.styles";
import { Facebook, Twitter, Google, Call } from "@mui/icons-material";

const barbersData = [
  {
    name: "NEAL LEYTON",
    title: "MASTER BARBER",
    description:
      "Dignissim per dis dignissim mi nibh a parturient habitasse suspendisse ut a feugiat.",
    image: "image-url-1", // Replace with actual image URLs
  },
  {
    name: "BRUCE SUTTON",
    title: "HAIRDRESSER",
    description:
      "Dignissim per dis dignissim mi nibh a parturient habitasse suspendisse ut a feugiat.",
    image: "image-url-2", // Replace with actual image URLs
  },
  // Add more barber objects if needed
];

export default function BarbersSection() {
  return (
    <BarbersContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
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
                  <Typography variant="h6">{barber.name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {barber.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {barber.description}
                  </Typography>
                  <SocialIcons>
                    <IconButton>
                      <Facebook />
                    </IconButton>
                    <IconButton>
                      <Twitter />
                    </IconButton>
                    <IconButton>
                      <Google />
                    </IconButton>
                  </SocialIcons>
                  <ContactButton>
                    <Call />
                  </ContactButton>
                </BarberInfo>
              </BarberCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </BarbersContainer>
  );
}
