/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchAllAppointmentsQuery,
  useFetchServiceByIdQuery,
  useDeleteAppointmentMutation,
  useFetchBarberByIdQuery,
} from "../../services/api";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import dayjs from "dayjs";

const AppointmentsBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch,
  } = useFetchAllAppointmentsQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state, navigate]);

  const handleEdit = (id) => {
    navigate(`/appointments/edit/${id}`);
  };

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleAlertClose = () => {
    setAlert(null); // Remove the alert from the DOM after fade-out
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      try {
        await deleteAppointment(selectedAppointment.id).unwrap();

        setOpenDialog(false);
        refetch();

        setAlert({
          message: "Appointment deleted successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error deleting appointment: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      renderCell: (params) => {
        return `${params.row.firstName} ${params.row.lastName}`;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "serviceType",
      headerName: "Service",
      width: 200,
      renderCell: (params) => {
        const { data: service } = useFetchServiceByIdQuery(
          params.row.serviceType
        );
        return service ? service.title : "Loading...";
      },
    },
    {
      field: "preferredHairdresser",
      headerName: "Barber",
      width: 150,
      renderCell: (params) => {
        const { data: barber } = useFetchBarberByIdQuery(
          params.row.preferredHairdresser
        );
        return barber ? `${barber.firstName} ${barber.lastName}` : "Loading...";
      },
    },
    {
      field: "appointmentDateTime",
      headerName: "Date & Time",
      width: 200,
      renderCell: (params) =>
        dayjs(params.row.appointmentDateTime).format("DD/MM/YYYY HH:mm"),
    },
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
    return <Typography>Error loading appointments</Typography>;
  }

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
        Manage Appointments
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "flex-start" : "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/appointments/create")}
          >
            Create New Appointment
          </Button>
        </Box>
        <DataGrid rows={appointments} columns={columns} pageSize={5} />

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Appointment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the appointment for{" "}
              {selectedAppointment?.firstName} {selectedAppointment?.lastName}?
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

export default AppointmentsBase;
