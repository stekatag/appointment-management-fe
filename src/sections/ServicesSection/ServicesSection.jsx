import { useState, useEffect } from "react";
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
  Alert,
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
import { useFetchServicesQuery } from "../../services/api/servicesApi";
import { useFetchServiceCategoriesQuery } from "../../services/api/serviceCategoriesApi";

export default function ServicesSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTab, setSelectedTab] = useState(0); // Updated to be a number
  const [servicesByCategory, setServicesByCategory] = useState({});

  const { data: services = [] } = useFetchServicesQuery();
  const { data: categories = [] } = useFetchServiceCategoriesQuery();

  useEffect(() => {
    if (services.length && categories.length) {
      const organizedServices = categories.reduce((acc, category) => {
        acc[category.name] = services.filter(
          (service) => service.category === category.id
        );
        return acc;
      }, {});
      setServicesByCategory(organizedServices);
    }
  }, [services, categories]);

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

          {services.length > 0 ? (
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
                    {Object.keys(servicesByCategory).map((category, index) => (
                      <Tab key={category} label={category} value={index} />
                    ))}
                  </Tabs>
                </CustomTabs>
              </Box>

              {Object.keys(servicesByCategory).map((category, index) => (
                <TabPanel key={category} value={selectedTab} index={index}>
                  <ServiceGrid>
                    {servicesByCategory[category].map((service) => (
                      <ServiceItem key={service.id}>
                        <ServiceTitle>{service.title}</ServiceTitle>
                        <Typography variant="body2" color="textSecondary">
                          {service.description}
                        </Typography>
                        <ServicePrice>{`$${service.price.toFixed(
                          2
                        )}`}</ServicePrice>
                        <Box sx={{ flexGrow: 1 }} />
                        <Link href="#booking-section" underline="none">
                          <BookButton variant="contained">Book now</BookButton>
                        </Link>
                      </ServiceItem>
                    ))}
                  </ServiceGrid>
                </TabPanel>
              ))}
            </ServiceTabContent>
          ) : (
            <Alert severity="warning">
              There are no services available in the database.
            </Alert>
          )}
        </Container>
      </ScrollAnimation>
    </ServicesContainer>
  );
}

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
