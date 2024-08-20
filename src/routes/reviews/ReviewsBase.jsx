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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchReviewsQuery,
  useDeleteReviewMutation,
} from "../../services/api/reviewsApi";
import { useFetchServiceByIdQuery } from "../../services/api/servicesApi";
import { useFetchBarberByIdQuery } from "../../services/api/barbersApi";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ReviewsBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [deleteReview] = useDeleteReviewMutation();
  const [selectedReview, setSelectedReview] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useFetchReviewsQuery();

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
    }
  }, [location.state, navigate]);

  const handleEdit = (id) => {
    navigate(`/reviews/edit/${id}`);
  };

  const handleOpenDialog = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReview(null);
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  const handleDelete = async () => {
    if (selectedReview) {
      try {
        await deleteReview(selectedReview.id).unwrap();

        setOpenDialog(false);
        refetch();

        setAlert({
          message: "Review deleted successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error deleting review: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  const filteredReviews =
    user?.role === "admin"
      ? reviews
      : reviews.filter((review) => review.userId === user.id);

  const columns = [
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => params.row.name,
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
      field: "barberId",
      headerName: "Barber",
      width: 150,
      renderCell: (params) => {
        const { data: barber } = useFetchBarberByIdQuery(params.row.barberId);
        return barber ? `${barber.firstName} ${barber.lastName}` : "Loading...";
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
    },
    {
      field: "appointmentDateTime",
      headerName: "Date of Appointment",
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
    return <Typography>Error loading reviews</Typography>;
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
        {user?.role === "admin" ? "Manage All Reviews" : "My Reviews"}
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "flex-start" : "flex-end",
            mb: 2,
          }}
        >
          {user?.role !== "admin" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/reviews/create")}
            >
              Write a Review
            </Button>
          )}
        </Box>
        <DataGrid rows={filteredReviews} columns={columns} pageSize={5} />

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Review"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the review for{" "}
              {selectedReview?.name}?
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

export default ReviewsBase;
