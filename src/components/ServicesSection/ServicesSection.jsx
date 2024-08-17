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
  Haircut: [
    {
      title: "Classic haircut",
      description:
        "Sapien nunc amet ultrices, dolores sit ipsum velit purus aliquet, massa fringilla leo orci.",
      price: "$7.50",
    },
    {
      title: "Haircut and shampoo",
      description:
        "Venenatis hac curabitur per quis parturient vel ut a sit scelerisque a sociis posuere penatibus.",
      price: "$5.00",
    },
    {
      title: "Beard and moustache",
      description:
        "Dolores sit ipsum velit purus aliquet massa fringilla leo orci lorem ipsum dolor sit amet.",
      price: "$6.75",
    },
  ],
  Shaving: [
    {
      title: "Head massage",
      description:
        "Ut enim ad minim veniam quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: "$4.50",
    },
    {
      title: "Hair treatment",
      description:
        "Dolores sit ipsum velit purus aliquet massa fringilla leo orci lorem ipsum dolor sit amet.",
      price: "$6.75",
    },
    {
      title: "Beard trimming",
      description:
        "Venenatis hac curabitur per quis parturient vel ut a sit scelerisque a sociis posuere penatibus.",
      price: "$5.00",
    },
  ],
  Trimming: [
    {
      title: "Trimming service 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$4.00",
    },
    {
      title: "Trimming service 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      price: "$6.50",
    },
    {
      title: "Trimming service 3",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      price: "$5.25",
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
