import { Typography, Link } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://sgogov.dev/" target="_blank">
        Stefan Gogov
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
