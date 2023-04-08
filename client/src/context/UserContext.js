import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();
  const signInUser = async (emailAddress, password) => {
    await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${emailAddress}:${password}`),
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Invalid Username/Password");
          return navigate("/signin");
        } else {
          navigate("/");
          return res.json();
        }
      })
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          //Set data for current user in global state
          setAuthenticatedUser(data);
          setAuthenticatedUser((prevState) => ({
            ...prevState,
            password: password,
          }));
          console.log(authenticatedUser);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const signOutUser = () => {
    setAuthenticatedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        authenticatedUser,
        actions: {
          signIn: signInUser,
          signOut: signOutUser,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
