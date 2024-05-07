import { Navigate, Outlet } from "react-router-dom";

const PriavateRoute = () => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PriavateRoute;
