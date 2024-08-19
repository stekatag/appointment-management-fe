import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchServicesQuery,
  useDeleteServiceMutation,
} from "../../services/api/servicesApi";
import { useFetchServiceCategoryByIdQuery } from "../../services/api/serviceCategoriesApi";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ButtonsContainer } from "./ServiceBase.styles";

const ServicesBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useFetchServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [selectedService, setSelectedService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(location.state?.alert || null);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      navigate(location.pathname, { replace: true }); // Remove the alert from history after displaying it once
    }
  }, [location, navigate]);

  const handleEdit = (id) => {
    navigate(`/manage-services/edit/${id}`);
  };

  const handleOpenDialog = (service) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedService(null);
  };

  const handleDelete = async () => {
    if (selectedService) {
      try {
        await deleteService(selectedService.id).unwrap();
        setOpenDialog(false);
        refetch();
        setAlert({
          message: "Service deleted successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error deleting service: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: category } = useFetchServiceCategoryByIdQuery(
          params.row.category
        );
        return category ? category.name : "Loading...";
      },
    },
    { field: "price", headerName: "Price", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading services</Typography>;
  }

  return (
    <DashboardLayout>
      {alert && (
        <FadeAlert
          message={alert.message}
          severity={alert.severity}
          duration={3000}
          onClose={() => setAlert(null)}
        />
      )}
      <Typography variant="h4" gutterBottom>
        Manage Services
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <ButtonsContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-services/create")}
          >
            Add New Service
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/manage-service-categories/")}
          >
            Manage Categories
          </Button>
        </ButtonsContainer>
        <DataGrid rows={services} columns={columns} pageSize={10} />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the service{" "}
              <strong>{selectedService?.title}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default ServicesBase;
