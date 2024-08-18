import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import Barbers from "./Barbers";
import ContactUs from "./ContactUs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

import AppointmentsBase from "./base/AppointmentsBase";
import AppointmentForm from "../components/AppointmentForm";
import EditAppointment from "../components/EditAppointment";
import BarbersBase from "./base/BarbersBase";
import BarberForm from "../components/BarberForm";
import EditBarber from "../components/EditBarber";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/barbers" element={<Barbers />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
      </Route>

      {/* User routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Appointments routes */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<AppointmentsBase />} />
        <Route
          path="create"
          element={
            <DashboardLayout>
              <AppointmentForm />
            </DashboardLayout>
          }
        />
        <Route
          path="edit/:appointmentId"
          element={
            <DashboardLayout>
              <EditAppointment />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Barbers routes */}
      <Route
        path="/manage-barbers"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<BarbersBase />} />
        <Route
          path="create"
          element={
            <DashboardLayout>
              <BarberForm />
            </DashboardLayout>
          }
        />
        <Route
          path="edit/:userId"
          element={
            <DashboardLayout>
              <EditBarber />
            </DashboardLayout>
          }
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
