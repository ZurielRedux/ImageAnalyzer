import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/signin");
  }

  return <div></div>;
};
