import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import Barbers from "./Barbers";
import ContactUs from "./ContactUs";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import AdminDashboard from "./dashboards/AdminDashboard";
import UserDashboard from "./dashboards/UserDashboard";
import BarberDashboard from "./dashboards/BarberDashboard";

import AppointmentsBase from "./appointments/AppointmentsBase";
import AppointmentForm from "../forms/AppointmentForm";
import EditAppointment from "./appointments/EditAppointment";
import BarbersBase from "./barbers/BarbersBase";
import BarberForm from "../forms/BarberForm";
import EditBarber from "./barbers/EditBarber";
import ServicesBase from "./services/ServicesBase";
import ServiceForm from "../forms/ServiceForm";
import EditService from "./services/EditService";
import ServiceCategoriesBase from "./service-categories/ServiceCategoriesBase";
import ServiceCategoryForm from "../forms/ServiceCategoryForm";
import EditServiceCategory from "./service-categories/EditServiceCategory";
import ReviewsBase from "./reviews/ReviewsBase";
import ReviewForm from "../forms/ReviewForm";
import EditReview from "./reviews/EditReview";
import UserManagement from "./user/UserManagement";
import ProfileManagement from "./user/ProfileManagement";
import BootServer from "./auth/BootServer";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/barbers" element={<Barbers />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/boot-server" element={<BootServer />} />

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

      {/* Barber routes */}
      <Route
        path="/barber"
        element={
          <ProtectedRoute allowedRoles={["barber"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/barber/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <DashboardLayout>
              <BarberDashboard />
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
          <ProtectedRoute allowedRoles={["admin", "barber", "user"]}>
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

      {/* Services routes */}
      <Route
        path="/manage-services"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ServicesBase />} />
        <Route
          path="create"
          element={
            <DashboardLayout>
              <ServiceForm />
            </DashboardLayout>
          }
        />
        <Route
          path="edit/:serviceId"
          element={
            <DashboardLayout>
              <EditService />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Service Categories routes */}
      <Route
        path="/manage-service-categories"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ServiceCategoriesBase />} />
        <Route
          path="create"
          element={
            <DashboardLayout>
              <ServiceCategoryForm />
            </DashboardLayout>
          }
        />
        <Route
          path="edit/:categoryId"
          element={
            <DashboardLayout>
              <EditServiceCategory />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Review routes */}
      <Route
        path="/reviews"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ReviewsBase />} />
        <Route
          path="create"
          element={
            <DashboardLayout>
              <ReviewForm />
            </DashboardLayout>
          }
        />
        <Route
          path="edit/:reviewId"
          element={
            <DashboardLayout>
              <EditReview />
            </DashboardLayout>
          }
        />
      </Route>

      {/* User Management routes */}
      <Route
        path="/manage-users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserManagement />} />
      </Route>

      {/* Profile Management routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["admin", "user", "barber"]}>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfileManagement />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
