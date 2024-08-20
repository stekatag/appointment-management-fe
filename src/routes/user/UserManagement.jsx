import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useFetchUsersQuery } from "../../services/api/usersApi";
import DashboardLayout from "../../layouts/DashboardLayout";

const UserManagement = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { data: users = [], isLoading, isError } = useFetchUsersQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
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
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
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
    return <Typography>Loading users...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading users</Typography>;
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Manage Users
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
            onClick={() => navigate("/users/create")}
          >
            Add New User
          </Button>
        </Box>
        <DataGrid rows={users} columns={columns} pageSize={5} />

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle delete user logic here
                handleCloseDialog();
              }}
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

export default UserManagement;
