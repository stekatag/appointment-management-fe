import { Grid, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  GalleryContainer,
  GalleryItem,
  GalleryImage,
} from "./GallerySection.styles";
import ScrollAnimation from "react-animate-on-scroll";

const images = [
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery1.jpg",
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery2.jpg",
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery3.jpg",
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery4.jpg",
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery5.jpg",
  "https://www.keydesign-themes.com/etalon/barber/wp-content/uploads/sites/26/2020/12/gallery6.jpg",
];

export default function GallerySection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <GalleryContainer>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Latest trends
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Traditional barbering, providing a comfortable environment for people
          of all ages.
        </Typography>
      </Box>
      <ScrollAnimation
        animateIn={isSmallScreen ? "fadeIn" : "fadeInLeftBig"}
        animateOnce
      >
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <GalleryItem>
                <GalleryImage src={image} alt={`Gallery image ${index + 1}`} />
              </GalleryItem>
            </Grid>
          ))}
        </Grid>
      </ScrollAnimation>
    </GalleryContainer>
  );
}
