import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../provider/authProvider";
import { AuthContextType } from "../../models/auth";


const ProtectedRoute = () => {
  const token = useAuth();
  if (!token.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectedRoute;
