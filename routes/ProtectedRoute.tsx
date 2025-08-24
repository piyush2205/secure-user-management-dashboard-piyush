import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = Boolean(token); // compute dynamically
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}
