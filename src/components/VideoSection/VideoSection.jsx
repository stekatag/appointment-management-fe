import { useState } from "react";
import { Container, Link, Typography } from "@mui/material";
import {
  VideoSectionContainer,
  TextContent,
  CTAButton,
  VideoThumbnailCard,
  VideoThumbnailCardInner,
  VideoThumbnailMedia,
  PlayButton,
  VideoDialog,
  VideoWrapper,
  BackgroundColorContainer,
} from "./VideoSection.styles";
import { PlayArrowRounded } from "@mui/icons-material";
import YouTube from "react-youtube";
import ScrollAnimation from "react-animate-on-scroll";

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <BackgroundColorContainer>
      <Container maxWidth="lg">
        <ScrollAnimation animateIn="fadeInRightBig" animateOnce>
          <VideoSectionContainer id="video-section">
            <TextContent>
              <Typography variant="h3" component="h3">
                Experience the traditional barbershop look and feel
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Come see what all the buzz is about. If you&rsquo;re looking for
                precision and that quality haircut, then this is your place. Our
                highly trained barbers are very versatile and cut all hair types
                and styles.
              </Typography>
              <Link href="#services-section" underline="none">
                <CTAButton variant="contained">Get Started</CTAButton>
              </Link>
            </TextContent>
            <VideoThumbnailCard onClick={handleClickOpen}>
              <VideoThumbnailCardInner>
                <VideoThumbnailMedia
                  image="https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/blog2.jpg"
                  title="Barbershop Video"
                />
                <PlayButton>
                  <PlayArrowRounded style={{ fontSize: "2.5rem" }} />
                </PlayButton>
              </VideoThumbnailCardInner>
            </VideoThumbnailCard>
          </VideoSectionContainer>
        </ScrollAnimation>
      </Container>

      <VideoDialog open={open} onClose={handleClose} maxWidth="md">
        <VideoWrapper>
          <YouTube videoId="HueapC-xd0o" opts={opts} onEnd={handleClose} />
        </VideoWrapper>
      </VideoDialog>
    </BackgroundColorContainer>
  );
}
