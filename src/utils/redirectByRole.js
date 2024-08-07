import { useNavigate } from "react-router-dom";

const useRedirectByRole = () => {
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    }

    if (role === "user") {
      navigate("/user/dashboard");
    }
  };

  return redirectByRole;
};

export default useRedirectByRole;
