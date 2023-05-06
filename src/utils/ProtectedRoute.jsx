import React from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigate, Route, redirect } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  if (!currentUser) {
    navigate("/login");
    return;
  }
  return children;
};

export default ProtectedRoute;
