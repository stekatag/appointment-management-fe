import { useParams } from "react-router-dom";
import { useFetchServiceCategoryByIdQuery } from "../../services/api/serviceCategoriesApi";
import ServiceCategoryForm from "../../forms/ServiceCategoryForm";
import { CircularProgress, Typography } from "@mui/material";

const EditServiceCategory = () => {
  const { categoryId } = useParams();
  const {
    data: categoryToEdit,
    isLoading,
    isError,
  } = useFetchServiceCategoryByIdQuery(categoryId);

  if (isLoading) {
    return <CircularProgress disableShrink />;
  }

  if (isError || !categoryToEdit) {
    return <Typography variant="h6">Service Category not found</Typography>;
  }

  return <ServiceCategoryForm categoryToEdit={categoryToEdit} />;
};

export default EditServiceCategory;
