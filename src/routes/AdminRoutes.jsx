/* eslint-disable react/prop-types */
// AdminRoutes.js

import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If admin, render the requested admin route component
  return <>{children}</>;
};

export default AdminRoutes;
