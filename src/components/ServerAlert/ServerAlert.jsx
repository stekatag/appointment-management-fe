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
          <StyledButton variant="contained">
            <StyledLink href="/boot-server">Boot server</StyledLink>
          </StyledButton>
        </Alert>
      </Grid>
    </AlertContainer>
  );
}

ServerAlert.propTypes = {
  keyword: PropTypes.string.isRequired,
};
