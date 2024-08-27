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
  Button,
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
import ServerAlert from "../../components/ServerAlert/ServerAlert";
import ScrollAnimation from "react-animate-on-scroll";
import { useFetchServicesQuery } from "../../services/api/servicesApi";
import { useFetchServiceCategoriesQuery } from "../../services/api/serviceCategoriesApi";

export default function ServicesSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTab, setSelectedTab] = useState(0);
  const [servicesByCategory, setServicesByCategory] = useState({});

  const { data: servicesData, error: servicesError } = useFetchServicesQuery();
  const { data: categoriesData, error: categoriesError } =
    useFetchServiceCategoriesQuery();

  useEffect(() => {
    if (servicesData?.results && categoriesData?.results) {
      const organizedServices = categoriesData.results.reduce(
        (acc, category) => {
          acc[category.name] = servicesData.results.filter(
            (service) => service.category === category.id
          );
          return acc;
        },
        {}
      );
      setServicesByCategory(organizedServices);
    }
  }, [servicesData, categoriesData]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (servicesError || categoriesError) {
    return (
      <ServicesContainer id="services-section">
        <Container maxWidth="lg">
          <Alert severity="error">
            <Typography variant="h6">
              An error occurred while loading services.
            </Typography>
            <Typography>Please try refreshing the page.</Typography>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Refresh Page
            </Button>
          </Alert>
        </Container>
      </ServicesContainer>
    );
  }

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

          {servicesData?.results?.length > 0 ? (
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
                    {categoriesData?.results?.map((category, index) => (
                      <Tab
                        key={category.id}
                        label={category.name}
                        value={index}
                      />
                    ))}
                  </Tabs>
                </CustomTabs>
              </Box>

              {categoriesData?.results?.map((category, index) => (
                <TabPanel key={category.id} value={selectedTab} index={index}>
                  <ServiceGrid>
                    {servicesByCategory[category.name]?.map((service) => (
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
            <ServerAlert keyword="services" />
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
