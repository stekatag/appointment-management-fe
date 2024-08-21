import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardContent, CardActionArea, Grid } from "@mui/material";
import { DashboardCardIcon, DashboardCardTitle } from "./DashboardCard.styles";

export default function DashboardCard({ icon: Icon, title, to }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea component={Link} to={to}>
          <CardContent>
            <DashboardCardIcon as={Icon} />
            <DashboardCardTitle variant="h6">{title}</DashboardCardTitle>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

DashboardCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
