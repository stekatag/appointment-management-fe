import { useParams } from "react-router-dom";
import { useFetchBarberByIdQuery } from "../services/api";
import BarberForm from "./BarberForm";
import { CircularProgress, Typography } from "@mui/material";

const EditBarber = () => {
  const { userId } = useParams();
  const {
    data: barberToEdit,
    isLoading,
    isError,
  } = useFetchBarberByIdQuery(userId);

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  if (isError || !barberToEdit) {
    return <Typography variant="h6">Barber not found</Typography>;
  }

  return <BarberForm barberToEdit={barberToEdit} />;
};

export default EditBarber;
