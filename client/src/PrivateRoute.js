import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";

const PrivateRoute = ({ children }) => {
  const { authenticatedUser } = useContext(UserContext);
  if (!authenticatedUser) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

export default PrivateRoute;
