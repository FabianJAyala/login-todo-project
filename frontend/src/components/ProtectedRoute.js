import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <div className="justify-content-center">Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;