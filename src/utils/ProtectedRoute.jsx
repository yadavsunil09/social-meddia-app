import React from "react";
import { useAuth } from "../context/UserAuthContext";
import { Navigate, Route, redirect } from "react-router-dom";
const ProtectedRoute = ({ component, ...rest }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return component;
};

export default ProtectedRoute;
