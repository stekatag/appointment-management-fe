import { Container, Grid, Typography } from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import {
  FooterContainer,
  FooterLink,
  FooterTitle,
  FooterSection,
  FooterBottom,
  FooterIconContainer,
} from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FooterTitle>OPENING HOURS</FooterTitle>
            <FooterSection>
              <Typography variant="body2">Monday: Closed</Typography>
              <Typography variant="body2">
                Tuesday - Sunday: 10:00 - 19:00
              </Typography>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>SERVICES</FooterTitle>
            <FooterLink>Haircut and shampoo</FooterLink>
            <FooterLink>Beard and moustache</FooterLink>
            <FooterLink>Shaving and trimming</FooterLink>
            <FooterLink>Hairstyling</FooterLink>
            <FooterLink>Specials</FooterLink>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>ADDITIONAL LINKS</FooterTitle>
            <FooterLink>About us</FooterLink>
            <FooterLink>Terms and conditions</FooterLink>
            <FooterLink>Privacy policy</FooterLink>
            <FooterLink>News</FooterLink>
            <FooterLink>Contact us</FooterLink>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>LATEST NEWS</FooterTitle>
            <FooterLink>Land lights let be divided</FooterLink>
            <FooterLink>Seasons over bearing air</FooterLink>
            <FooterLink>Signs likeness for may</FooterLink>
            <FooterLink>Greater open after grass</FooterLink>
            <FooterLink>Gathered was divide second</FooterLink>
          </Grid>
        </Grid>
      </Container>
      <FooterBottom>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <LocationOn />
                <Typography variant="body2">
                  13 Bulgaria Blvd, Plovdiv, Bulgaria
                </Typography>
              </FooterIconContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <Phone />
                <Typography variant="body2">+359 88 888 8888</Typography>
              </FooterIconContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <Email />
                <Typography variant="body2">contact@barbershop.com</Typography>
              </FooterIconContainer>
            </Grid>
          </Grid>
        </Container>
      </FooterBottom>
    </FooterContainer>
  );
}
