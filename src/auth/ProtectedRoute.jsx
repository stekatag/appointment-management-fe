import PropTypes from "prop-types";
import AuthGuard from "./AuthGuard";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  return <AuthGuard allowedRoles={allowedRoles}>{children}</AuthGuard>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
