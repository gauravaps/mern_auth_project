import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const SuperAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "superadmin") {
    return <Navigate to="/login" />;
  }

  return children; 
};

export default SuperAdminRoute;
