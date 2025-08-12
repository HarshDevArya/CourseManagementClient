import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";

export default function Protected({ role, children }) {
  const { user, role: currentRole } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && currentRole !== role) return <Navigate to="/" replace />;
  return children;
}
