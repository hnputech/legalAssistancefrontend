import { Navigate } from "react-router-dom";

// Dummy function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
