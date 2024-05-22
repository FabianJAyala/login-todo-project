import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GroupProtectedRoute = ({ children, requiredGroup }) => {
  const { isAuthorized, userGroups, isLoading } = useAuth();

  if (isLoading) {
    return <div className="justify-content-center">Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  if (!userGroups.includes(requiredGroup)) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default GroupProtectedRoute;