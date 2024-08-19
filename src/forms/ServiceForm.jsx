import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../services/api/servicesApi";
import { useFetchServiceCategoriesQuery } from "../services/api/serviceCategoriesApi";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").min(0),
});

export default function ServiceForm({ serviceToEdit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: serviceToEdit?.category || "",
      title: serviceToEdit?.title || "",
      description: serviceToEdit?.description || "",
      price: serviceToEdit?.price || "",
    },
  });

  const navigate = useNavigate();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const { data: categories = [] } = useFetchServiceCategoriesQuery();
  const [showFields, setShowFields] = useState(!!serviceToEdit);

  const onSubmit = async (data) => {
    try {
      let message = "";
      if (serviceToEdit) {
        await updateService({ id: serviceToEdit.id, ...data }).unwrap();
        message = "Service updated successfully!";
      } else {
        await createService(data).unwrap();
        message = "Service created successfully!";
      }
      navigate("/manage-services", {
        state: { alert: { severity: "success", message } },
      });
    } catch (error) {
      navigate("/manage-services", {
        state: {
          alert: { severity: "error", message: `Error: ${error.message}` },
        },
      });
    }
  };

  const selectedCategory = watch("category");

  useEffect(() => {
    if (selectedCategory) {
      setShowFields(true);
    } else {
      setShowFields(false);
    }
  }, [selectedCategory]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {serviceToEdit ? "Edit Service" : "Create Service"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        {showFields && (
          <>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isCreating || isUpdating}
                >
                  {serviceToEdit ? "Update Service" : "Create Service"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/manage-services")}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
