import { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ServicesContainer,
  ServiceItem,
  ServiceTitle,
  ServicePrice,
  ServiceTitleContainer,
  ServiceTabContent,
  BookButton,
  ServiceGrid,
  CustomTabs,
} from "./ServicesSection.styles";
import ScrollAnimation from "react-animate-on-scroll";

const servicesData = {
  Haircuts: [
    {
      title: "Classic Haircut",
      description:
        "A timeless haircut that suits all occasions, providing a clean and polished look. Includes a professional cut and style.",
      price: "$15.00",
    },
    {
      title: "Haircut & Shampoo",
      description:
        "A comprehensive package that includes a stylish haircut followed by a refreshing shampoo to leave your hair feeling clean and revitalized.",
      price: "$20.00",
    },
    {
      title: "Children’s Haircut",
      description:
        "A fun and friendly haircut experience for kids, ensuring they leave with a smile and a fresh new look.",
      price: "$10.00",
    },
  ],
  Grooming: [
    {
      title: "Beard Trim & Shape",
      description:
        "A precise beard trim and shape to maintain a clean and stylish look. Includes a consultation to achieve the perfect shape for your face.",
      price: "$12.00",
    },
    {
      title: "Hot Towel Shave",
      description:
        "A relaxing hot towel shave that softens the skin and beard for a smooth, close shave, leaving your skin refreshed and rejuvenated.",
      price: "$18.00",
    },
    {
      title: "Beard & Moustache Styling",
      description:
        "A detailed grooming service that includes trimming and styling of both beard and moustache, perfect for a well-groomed appearance.",
      price: "$15.00",
    },
  ],
  Treatments: [
    {
      title: "Scalp Massage",
      description:
        "A soothing scalp massage that helps relieve tension and promotes healthy hair growth. Perfect for stress relief and relaxation.",
      price: "$10.00",
    },
    {
      title: "Hair & Scalp Treatment",
      description:
        "A nourishing treatment that revitalizes both hair and scalp, addressing issues like dryness, dandruff, and hair loss.",
      price: "$25.00",
    },
    {
      title: "Eyebrow Shaping",
      description:
        "A precise eyebrow shaping service that enhances your facial features, ensuring a clean and sharp appearance.",
      price: "$8.00",
    },
  ],
};

export default function ServicesSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTab, setSelectedTab] = useState("Haircut");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ServicesContainer id="services-section">
      <ScrollAnimation
        animateIn={isSmallScreen ? "fadeIn" : "fadeInLeftBig"}
        animateOnce
      >
        <Container maxWidth="lg">
          <ServiceTitleContainer>
            <Typography variant="h3" component="h3">
              Services
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Combining traditional techniques with modern styles, providing
              cut, color, and shave services.
            </Typography>
          </ServiceTitleContainer>

          <ServiceTabContent>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                marginTop: "2rem",
              }}
            >
              <CustomTabs>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                  {Object.keys(servicesData).map((category) => (
                    <Tab key={category} label={category} value={category} />
                  ))}
                </Tabs>
              </CustomTabs>
            </Box>

            {Object.keys(servicesData).map((category) => (
              <TabPanel key={category} value={selectedTab} index={category}>
                <ServiceGrid>
                  {servicesData[category].map((service, index) => (
                    <ServiceItem key={index}>
                      <ServiceTitle>{service.title}</ServiceTitle>
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                      <ServicePrice>{service.price}</ServicePrice>
                      <Box sx={{ flexGrow: 1 }} />{" "}
                      {/* Spacer to push the button down */}
                      <Link href="#booking-section" underline="none">
                        <BookButton variant="contained">Book now</BookButton>
                      </Link>
                    </ServiceItem>
                  ))}
                </ServiceGrid>
              </TabPanel>
            ))}
          </ServiceTabContent>
        </Container>
      </ScrollAnimation>
    </ServicesContainer>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
