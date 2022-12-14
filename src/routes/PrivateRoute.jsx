import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return !localStorage.getItem("token") ? <Navigate to="/" /> : children;
};

export default PrivateRoute;
