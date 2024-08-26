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
  useFetchServiceCategoriesQuery,
  useDeleteServiceCategoryMutation,
} from "../../services/api/serviceCategoriesApi";
import DashboardLayout from "../../layouts/DashboardLayout";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import { ButtonsContainer } from "../services/ServiceBase.styles";

export default function ServiceCategoriesBase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useFetchServiceCategoriesQuery({
    page: 1,
    limit: 10,
  }); // Adjust as needed for pagination
  const [deleteServiceCategory] = useDeleteServiceCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(location.state?.alert || null); // Use the alert from location state

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleEdit = (id) => {
    navigate(`/manage-service-categories/edit/${id}`);
  };

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      try {
        await deleteServiceCategory(selectedCategory.id).unwrap();
        setOpenDialog(false);
        refetch();
        setAlert({
          message: "Service category deleted successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error deleting category: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading categories</Typography>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
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
          onClose={handleAlertClose}
        />
      )}
      <Typography variant="h4" gutterBottom>
        Manage Service Categories
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <ButtonsContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-service-categories/create")}
          >
            Add Category
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/manage-services/")}
          >
            Manage Services
          </Button>
        </ButtonsContainer>
        <DataGrid
          rows={data.results || []}
          columns={columns}
          pageSize={data.limit || 10}
          rowCount={data.totalResults}
          paginationMode="server"
          onPageChange={(newPage) => refetch({ page: newPage + 1 })}
        />
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Service Category"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {selectedCategory?.name}?
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
}
