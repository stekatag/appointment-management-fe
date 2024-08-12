import { Container, Grid, Box } from "@mui/material";
import {
  TopBarContainer,
  IconText,
  IconStyled,
  LinkIcon,
  icons,
  HorizontalLine,
} from "./TopBar.styles.jsx";

export default function TopBar() {
  const { LocationOn, Phone, Email, GitHub } = icons;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TopBarContainer>
          <Container maxWidth="lg">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconText>
                  <IconStyled>
                    <LocationOn />
                  </IconStyled>
                  49 Grand Street, Los Angeles
                  <IconStyled>
                    <Phone />
                  </IconStyled>
                  (222) 400-630
                  <IconStyled>
                    <Email />
                  </IconStyled>
                  contact@etalon-theme.com
                </IconText>
              </Grid>
              <Grid item>
                <IconText>
                  <LinkIcon href="#">
                    <GitHub />
                  </LinkIcon>
                </IconText>
              </Grid>
            </Grid>
          </Container>
        </TopBarContainer>
        <HorizontalLine />
      </Box>
    </>
  );
}
