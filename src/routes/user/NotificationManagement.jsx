import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  useFetchUserByIdQuery,
  useUpdateUserMutation,
} from "../../services/api/usersApi";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  registerNotifications,
  unsubscribeNotifications,
} from "../../utils/notificationUtils";

const NotificationManagement = () => {
  const authUser = useSelector((state) => state.auth.user);
  const userId = authUser?.id;
  console.log("authUserId", userId);
  const {
    data: user,
    isLoading: isUserLoading,
    isError,
    error,
  } = useFetchUserByIdQuery(userId);
  console.log("user", user);

  const [updateUser] = useUpdateUserMutation();

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (user) {
      setEmailNotifications(user.emailNotificationsEnabled || false);
      setPushNotifications(user.pushNotificationsEnabled || false);
    }
  }, [user]);

  const handleEmailNotificationsChange = async (event) => {
    const enabled = event.target.checked;
    setEmailNotifications(enabled);

    try {
      await updateUser({
        id: userId,
        emailNotificationsEnabled: enabled,
      }).unwrap();
      setAlert({
        type: "success",
        message: `Email notifications ${
          enabled ? "enabled" : "disabled"
        } successfully!`,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to update email notifications.",
      });
    }
  };

  const handlePushNotificationsChange = async (event) => {
    const enabled = event.target.checked;

    setIsLoading(true);
    try {
      if (enabled) {
        const subscription = await registerNotifications();
        if (subscription) {
          await updateUser({
            id: userId,
            pushNotificationsEnabled: true,
            pushSubscription: subscription, // Save the subscription to the user if necessary
          }).unwrap();
          setPushNotifications(true);
          setAlert({
            type: "success",
            message: "Push notifications enabled successfully!",
          });
        } else {
          setAlert({
            type: "error",
            message: "Failed to enable push notifications.",
          });
        }
      } else {
        await unsubscribeNotifications();
        await updateUser({
          id: userId,
          pushNotificationsEnabled: false,
          pushSubscription: {},
        }).unwrap();
        setPushNotifications(false);
        setAlert({
          type: "success",
          message: "Push notifications disabled successfully!",
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to update push notifications.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    console.error("Error fetching user:", error);
    return <Typography variant="h6">Failed to load user data</Typography>;
  }

  if (!user) {
    return <Typography variant="h6">No user data available</Typography>;
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Notification Management
      </Typography>

      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{ mt: 2, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Manage Notifications
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={emailNotifications}
              onChange={handleEmailNotificationsChange}
              color="primary"
            />
          }
          label="Enable Email Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={pushNotifications}
              onChange={handlePushNotificationsChange}
              color="primary"
              disabled={isLoading}
            />
          }
          label={
            isLoading
              ? "Enabling Push Notifications..."
              : "Enable Push Notifications"
          }
        />
      </Box>
    </DashboardLayout>
  );
};

export default NotificationManagement;
