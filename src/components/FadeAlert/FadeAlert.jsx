import { useEffect, useState } from "react";
import { Alert, Fade } from "@mui/material";
import PropTypes from "prop-types";

const FadeAlert = ({ message, severity, duration, onClose }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleExited = () => {
    if (onClose) {
      onClose(); // Trigger the onClose callback when the fade-out is complete
    }
  };

  return (
    <Fade in={open} timeout={600} onExited={handleExited}>
      <Alert severity={severity} sx={{ mb: 2 }}>
        {message}
      </Alert>
    </Fade>
  );
};

FadeAlert.propTypes = {
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
  duration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired, // Adding onClose as required to remove the alert from DOM
};

export default FadeAlert;
