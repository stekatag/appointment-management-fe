import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useCreateServiceCategoryMutation,
  useUpdateServiceCategoryMutation,
} from "../services/api/serviceCategoriesApi";

// Validation schema for the form
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export default function ServiceCategoryForm({ categoryToEdit }) {
  const navigate = useNavigate();
  const [createServiceCategory] = useCreateServiceCategoryMutation();
  const [updateServiceCategory, { isLoading: isUpdating }] =
    useUpdateServiceCategoryMutation();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: categoryToEdit?.name || "",
    },
  });

  useEffect(() => {
    if (categoryToEdit) {
      setValue("name", categoryToEdit.name);
    }
  }, [categoryToEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      let message = "";
      if (categoryToEdit?.id) {
        await updateServiceCategory({
          id: categoryToEdit.id,
          ...data,
        }).unwrap();
        message = "Category updated successfully!";
      } else {
        await createServiceCategory(data).unwrap();
        message = "Category created successfully!";
      }
      navigate("/manage-service-categories", {
        state: { alert: { severity: "success", message } },
      });
    } catch (error) {
      setAlert({ type: "error", message: `Error: ${error.message}` });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {categoryToEdit
              ? "Edit Service Category"
              : "Create Service Category"}
          </Typography>
        </Grid>
        {alert.message && (
          <Grid item xs={12}>
            <Alert severity={alert.type}>
              <AlertTitle>
                {alert.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              {alert.message}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <Button type="submit" variant="contained" disabled={isUpdating}>
              {categoryToEdit ? "Update Category" : "Create Category"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/manage-service-categories")}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

ServiceCategoryForm.propTypes = {
  categoryToEdit: PropTypes.object,
};
