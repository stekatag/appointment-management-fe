import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  useFetchServicesQuery,
  useDeleteServiceMutation,
} from "../../services/api";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";

const ServicesBase = () => {
  const navigate = useNavigate();
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useFetchServicesQuery();
  const [deleteService] = useDeleteServiceMutation();
  const [selectedService, setSelectedService] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading services</Typography>;
  }

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/manage-services/create")}
          sx={{ mb: 2 }}
        >
          Add New Service
        </Button>
        <DataGrid rows={services} columns={columns} pageSize={5} />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Delete Service</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the service "
              {selectedService?.title}"?
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
