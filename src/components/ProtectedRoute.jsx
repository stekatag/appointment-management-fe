import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Token should be cleared on log out
  // Token should be created in local storage on log in
  const token = JSON.parse(localStorage.getItem("token"));

  return token ? <>{children}</> : <Navigate to="/login" />;
}
