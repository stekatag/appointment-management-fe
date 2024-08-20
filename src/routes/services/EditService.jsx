import { useParams } from "react-router-dom";
import { useFetchServiceByIdQuery } from "../../services/api/servicesApi";
import ServiceForm from "../../forms/ServiceForm";
import { CircularProgress, Typography } from "@mui/material";

const EditService = () => {
  const { serviceId } = useParams();
  const {
    data: serviceToEdit,
    isLoading,
    isError,
  } = useFetchServiceByIdQuery(serviceId);

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  if (isError || !serviceToEdit) {
    return <Typography variant="h6">Service not found</Typography>;
  }

  return <ServiceForm serviceToEdit={serviceToEdit} />;
};

export default EditService;
