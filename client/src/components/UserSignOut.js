import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

const UserSignOut = () => {
  /* Get actions from UserContext for signin/signout functionality */
  const { actions } = useContext(UserContext);

  useEffect(() => actions.signOut());

  /* Navigates User back to list of courses after they sign out */
  return <Navigate to="/" replace />;
};

export default UserSignOut;
