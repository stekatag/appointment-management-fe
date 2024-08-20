import { useLocation } from "react-router-dom";
import { Breadcrumbs, Container } from "@mui/material";
import {
  BreadcrumbsContainer,
  BreadcrumbLink,
  BreadcrumbText,
  StyledNavigateNextIcon,
  BreadcrumbsTitle,
} from "./BreadcrumbsComponent.styles";

function BreadcrumbsComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbsContainer>
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<StyledNavigateNextIcon />}
          aria-label="breadcrumb"
        >
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return last ? (
              <BreadcrumbText key={to}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </BreadcrumbText>
            ) : (
              <BreadcrumbLink to={to} key={to}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </BreadcrumbLink>
            );
          })}
        </Breadcrumbs>
        <BreadcrumbsTitle variant="h2">
          {pathnames[pathnames.length - 1]?.charAt(0).toUpperCase() +
            pathnames[pathnames.length - 1]?.slice(1)}{" "}
          page
        </BreadcrumbsTitle>
      </Container>
    </BreadcrumbsContainer>
  );
}

export default BreadcrumbsComponent;
