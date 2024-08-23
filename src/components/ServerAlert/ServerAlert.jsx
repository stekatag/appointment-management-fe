import PropTypes from "prop-types";
import { Alert, Grid } from "@mui/material";
import { StyledButton, StyledLink, AlertContainer } from "./ServerAlert.styles";

export default function ServerAlert({ keyword }) {
  return (
    <AlertContainer container>
      <Grid item xs={12} md={8}>
        <Alert severity="warning">
          There are no {keyword} available in the database or the database is
          not connected. Please, click on the button below to boot the server.
          If you have already booted the server, refresh this page.
          <StyledButton variant="contained">
            <StyledLink
              target="_blank"
              href={"https://appointment-management-json-server.onrender.com/"}
            >
              Boot server
            </StyledLink>
          </StyledButton>
        </Alert>
      </Grid>
    </AlertContainer>
  );
}

ServerAlert.propTypes = {
  keyword: PropTypes.string.isRequired,
};
