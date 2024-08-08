import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchAppointmentByIdQuery } from "../services/api";
import AppointmentForm from "./AppointmentForm";
import { CircularProgress, Typography } from "@mui/material";
import dayjs from "dayjs";

const EditAppointment = () => {
  const { appointmentId } = useParams();
  const {
    data: appointmentToEdit,
    isLoading,
    isError,
  } = useFetchAppointmentByIdQuery(appointmentId);
  const [selectedDay, setSelectedDay] = useState(dayjs());

  useEffect(() => {
    if (appointmentToEdit) {
      setSelectedDay(dayjs(appointmentToEdit.appointmentDateTime));
    }
  }, [appointmentToEdit]);

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  if (isError || !appointmentToEdit) {
    return <Typography variant="h6">Appointment not found</Typography>;
  }

  return (
    <AppointmentForm
      appointmentToEdit={appointmentToEdit}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
    />
  );
};

export default EditAppointment;
