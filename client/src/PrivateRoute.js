import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";

const PrivateRoute = ({ children }) => {
  /* Retrieves authenticatedUser state from UserContext */
  const { authenticatedUser } = useContext(UserContext);
  if (!authenticatedUser) {
    // If user is not logged in, re-route them to signin page
    return <Navigate to="/signin" />;
  }
  /* Returns components that are wrapped within PrivateRoute if authenticated */
  return children;
};

export default PrivateRoute;
