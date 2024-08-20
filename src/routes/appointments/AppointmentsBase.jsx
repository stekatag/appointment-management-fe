/* eslint-disable react-hooks/rules-of-hooks */
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
  useMediaQuery,
  Badge,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchAllAppointmentsQuery,
  useFetchAppointmentsByUserQuery,
  useFetchAppointmentsByBarberQuery,
  useFetchAppointmentsByDayAndBarberQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../../services/api/appointmentsApi";
import { useFetchServiceByIdQuery } from "../../services/api/servicesApi";
import { useFetchBarberByIdQuery } from "../../services/api/barbersApi";
import { useFetchStatusByIdQuery } from "../../services/api/statusesApi";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import DaySlider from "../../components/DaySlider";

const AppointmentsBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [selectedDay, setSelectedDay] = useState(dayjs());

  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);

  let appointmentsQuery;

  switch (user?.role) {
    case "admin":
      appointmentsQuery = useFetchAllAppointmentsQuery();
      break;
    case "barber":
      appointmentsQuery = useFetchAppointmentsByBarberQuery(user?.id);
      break;
    case "user":
      appointmentsQuery = useFetchAppointmentsByUserQuery(user?.id);
      break;
    default:
      appointmentsQuery = {
        data: [],
        isLoading: false,
        isError: true,
        refetch: () => {},
      }; // Fallback in case the user role is undefined
      break;
  }

  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch,
  } = appointmentsQuery;

  const { data: dayAppointments = [] } =
    useFetchAppointmentsByDayAndBarberQuery(
      {
        day: selectedDay.format("YYYY-MM-DD"),
        barber: user?.id, // Currently logged barber
      },
      { skip: !selectedDay || user?.role !== "barber" }
    );

  useEffect(() => {
    const updatePastAppointments = async () => {
      if (appointments.length > 0) {
        const now = dayjs();

        for (const appointment of appointments) {
          const appointmentDate = dayjs(appointment.appointmentDateTime);

          if (appointmentDate.isBefore(now) && appointment.statusId !== "2") {
            try {
              // Update only the statusId while preserving other data
              await updateAppointment({
                ...appointment,
                statusId: "2", // "Past" status
              }).unwrap();
            } catch (error) {
              console.error("Failed to update appointment status", error);
            }
          }
        }

        refetch(); // Refetch after updates
      }
    };

    updatePastAppointments();
  }, [appointments, updateAppointment, refetch]);

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
    setAlert(null);
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

  const handleCancel = async () => {
    if (selectedAppointment) {
      try {
        await updateAppointment({
          ...selectedAppointment,
          statusId: "3", // "Cancelled" status
        }).unwrap();

        setOpenDialog(false);
        refetch();

        setAlert({
          message: "Appointment cancelled successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error cancelling appointment: ${error.message}`,
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
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        const { data: service } = useFetchServiceByIdQuery(
          params.row.serviceType
        );
        return service ? `$${service.price}` : "Loading...";
      },
    },
    {
      field: "appointmentDateTime",
      headerName: "Date & Time",
      width: 150,
      renderCell: (params) =>
        dayjs(params.row.appointmentDateTime).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const { data: status } = useFetchStatusByIdQuery(params.row.statusId);
        return (
          <Badge
            badgeContent={status?.name}
            color={status?.name === "Upcoming" ? "primary" : "secondary"}
            sx={{ padding: "5px 20px" }} // Adjust padding to fit within the column
          />
        );
      },
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
            disabled={
              params.row.statusId === "2" || params.row.statusId === "3"
            } // Disable edit if status is "Past" or "Cancelled"
          >
            Edit
          </Button>
          {user?.role === "admin" ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleOpenDialog(params.row)}
              disabled={
                params.row.statusId === "2" || params.row.statusId === "3"
              } // Disable delete if status is "Past" or "Cancelled"
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleOpenDialog(params.row)}
              disabled={
                params.row.statusId === "2" || params.row.statusId === "3"
              } // Disable cancel if status is "Past" or "Cancelled"
            >
              Cancel
            </Button>
          )}
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
        {user?.role === "admin" ? "Manage All Appointments" : "My Appointments"}
      </Typography>

      {/* Conditionally render Appointment Calendar for Barbers */}
      {user?.role === "barber" && (
        <Box mb={4}>
          <DaySlider currentDay={selectedDay} setCurrentDay={setSelectedDay} />
          <AppointmentCalendar
            appointments={dayAppointments}
            onSlotSelect={() => {}} // Disable slot selection
            selectedDay={selectedDay}
            selectedBarber={user?.id}
            initialSlot={null}
            readOnly
          />
        </Box>
      )}

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
            {user?.role === "admin"
              ? "Delete Appointment"
              : "Cancel Appointment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {user?.role === "admin"
                ? `Are you sure you want to delete the appointment for ${selectedAppointment?.firstName} ${selectedAppointment?.lastName}?`
                : `Are you sure you want to cancel the appointment for ${selectedAppointment?.firstName} ${selectedAppointment?.lastName}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={user?.role === "admin" ? handleDelete : handleCancel}
              color="secondary"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default AppointmentsBase;
