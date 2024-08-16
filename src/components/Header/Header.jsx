import TopBar from "../TopBar/TopBar";
import Navbar from "../NavBar/NavBar";
import { AppBar, Slide, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";

// A function to handle hiding or sticking the header
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Props validaiton
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position="sticky" color="default" elevation={4}>
          <TopBar />
          <Navbar />
        </AppBar>
      </HideOnScroll>
    </>
  );
}
