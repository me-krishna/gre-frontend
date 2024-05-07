import { Navigate, Outlet } from "react-router-dom";

const PriavateRoute = () => {
  const isAuth = false;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PriavateRoute;
