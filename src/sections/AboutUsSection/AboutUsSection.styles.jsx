import { styled } from "@mui/material/styles";
import { Box, Typography, Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AboutUsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 0),
  },
}));

export const AboutUsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
}));

export const AboutImageContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.down("md")]: {
    margin: theme.spacing(3, 0),
    padding: 0,
  },
}));

export const AboutImageInnerContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2.5),
}));

export const AboutImage = styled(Box)(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
}));

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  padding: theme.spacing(1),

  "&:hover": {
    [`& ${AccordionTitle}, & ${AccordionIcon}`]: {
      color: theme.palette.primary.main,
    },
  },

  "&.Mui-expanded": {
    [`& ${AccordionTitle}, & ${AccordionIcon}`]: {
      color: theme.palette.primary.main,
    },
  },
}));

export const AccordionIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.text.secondary.main,
}));

export const AccordionItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
}));

export const AccordionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.secondary.main,
  transition: "color 0.25s",
}));

export const AccordionContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));
