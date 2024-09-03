import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  TextField,
} from "@mui/material";
import {
  ContactContainer,
  ContactInfoContainer,
  ContactFormContainer,
  ContactInfoItem,
  ContactIcon,
  ContactButton,
  ContactTitle,
} from "./ContactSection.styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { useFetchUserByIdQuery } from "../../services/api/usersApi";

// Validation schema for the form
const schema = yup.object().shape({
  name: yup.string().min(2).required("Your name is required"),
  phone: yup.string().min(10).required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: yup.string().required("Reason for contact is required"),
  message: yup.string().required("Message is required"),
  access_key: yup.string().required(),
  from_name: yup.string().required(),
});

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function ContactSection() {
  const user = useSelector((state) => state.auth.user);
  const { data: userData } = useFetchUserByIdQuery(user?.id, {
    skip: !user,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      access_key: ACCESS_KEY,
      from_name: "",
      name: userData ? `${user.firstName} ${user.lastName}` : "",
      phone: userData ? user.contactNumber : "",
      email: userData ? user.email : "",
      subject: "",
      message: "",
    },
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (user && userData) {
      const name = `${userData.firstName} ${userData.lastName}`;
      setValue("name", name);
      setValue("phone", userData.contactNumber);
      setValue("email", userData.email);
      setValue("from_name", name);
    }
  }, [user, userData, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data, null, 2),
      });
      const json = await response.json();

      if (json.success) {
        setAlert({
          type: "success",
          message: "Message sent successfully!",
        });
        reset();
      } else {
        setAlert({
          type: "error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setAlert({
        type: "error",
        message: "Error submitting the form.",
      });
    }
  };

  return (
    <ContactContainer maxWidth="lg">
      <Grid container spacing={4}>
        {/* Contact Information */}
        <ContactInfoContainer item xs={12} md={6}>
          <ContactTitle variant="h3" component="h3" gutterBottom>
            How to find us
          </ContactTitle>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Our goal is to provide the best customer service and to answer all
            of your questions in a timely manner.
          </Typography>

          <ContactInfoItem>
            <ContactIcon>
              <PhoneIcon />
            </ContactIcon>
            <Typography variant="body1">+359 88 888 8888</Typography>
          </ContactInfoItem>

          <ContactInfoItem>
            <ContactIcon>
              <EmailIcon />
            </ContactIcon>
            <Typography variant="body1">contact@barbershop.com</Typography>
          </ContactInfoItem>

          <ContactInfoItem>
            <ContactIcon>
              <LocationOnIcon />
            </ContactIcon>
            <Typography variant="body1">
              13 Bulgaria Blvd. Plovdiv, Bulgaria
            </Typography>
          </ContactInfoItem>
        </ContactInfoContainer>

        {/* Contact Form */}
        <ContactFormContainer item xs={12} md={6}>
          <ContactTitle variant="h3" component="h3" gutterBottom>
            Leave us a message
          </ContactTitle>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Our goal is to provide the best customer service and to answer all
            of your questions in a timely manner.
          </Typography>

          {alert.message && (
            <Alert severity={alert.type}>
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 3 }}
          >
            <input
              type="hidden"
              value={ACCESS_KEY}
              {...register("access_key")}
            />
            <input type="hidden" {...register("from_name")} />
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: "none" }}
              {...register("botcheck")}
            ></input>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      required
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Reason for Contact"
                      fullWidth
                      required
                      error={!!errors.subject}
                      helperText={errors.subject ? errors.subject.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Your Message"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      error={!!errors.message}
                      helperText={errors.message ? errors.message.message : ""}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <ContactButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </ContactButton>
              </Grid>
            </Grid>
          </Box>
        </ContactFormContainer>
      </Grid>
    </ContactContainer>
  );
}
