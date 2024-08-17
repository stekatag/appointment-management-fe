import { useTheme, useMediaQuery, Box, Grid, Container } from "@mui/material";
import Marquee from "react-fast-marquee";
import {
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  GitHub,
} from "@mui/icons-material";
import {
  TopBarContainer,
  IconText,
  IconStyled,
  LinkIcon,
  LinkIconContainer,
  HorizontalLine,
  StyledLink,
} from "./TopBar.styles.jsx";

export default function TopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      {isSmallScreen ? (
        // This version will show for "md" and below
        <TopBarContainer>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            <Marquee gradient={false} speed={50} pauseOnClick pauseOnHover>
              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconText>
                    <IconStyled>
                      <LocationOnOutlined />
                    </IconStyled>
                    13 Bulgaria Blvd. Plovdiv, Bulgaria
                    <IconStyled>
                      <PhoneOutlined />
                    </IconStyled>
                    <StyledLink to="tel:+359888888888">
                      +359 88 888 8888
                    </StyledLink>
                    <IconStyled>
                      <EmailOutlined />
                    </IconStyled>
                    <StyledLink to="mailto:contact@barbershop.com">
                      contact@barbershop.com
                    </StyledLink>
                  </IconText>
                </Box>
              </Grid>
              <Grid item>
                <LinkIconContainer>
                  <LinkIcon
                    to="https://github.com/stekatag/appointment-management-fe/"
                    target="_blank"
                  >
                    <GitHub />
                  </LinkIcon>
                </LinkIconContainer>
              </Grid>
            </Marquee>
          </Grid>
        </TopBarContainer>
      ) : (
        // This version will show for "md" and above
        <TopBarContainer>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconText>
                  <IconStyled>
                    <LocationOnOutlined />
                  </IconStyled>
                  13 Bulgaria Blvd. Plovdiv, Bulgaria
                  <IconStyled>
                    <PhoneOutlined />
                  </IconStyled>
                  <StyledLink to="tel:+359888888888">
                    +359 88 888 8888
                  </StyledLink>
                  <IconStyled>
                    <EmailOutlined />
                  </IconStyled>
                  <StyledLink to="mailto:contact@barbersho.com">
                    contact@barbershop.com
                  </StyledLink>
                </IconText>
              </Grid>
              <Grid item>
                <IconText>
                  <LinkIcon
                    to="https://github.com/stekatag/appointment-management-fe/"
                    target="_blank"
                  >
                    <GitHub />
                  </LinkIcon>
                </IconText>
              </Grid>
            </Grid>
          </Container>
        </TopBarContainer>
      )}
      <HorizontalLine />
    </Box>
  );
}
