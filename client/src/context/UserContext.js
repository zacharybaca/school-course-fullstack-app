import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );
  Cookies.set("authenticatedUser", JSON.stringify(authenticatedUser), {
    expires: 1,
  });
  console.log("Cookie: ", cookie);
  const navigate = useNavigate();
  const signInUser = async (emailAddress, password) => {
    await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${emailAddress}:${password}`),
      },
      credentials: "include",
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
        console.log("Data: ", data);
        setAuthenticatedUser(data);
        //Set data for current user in global state
        setAuthenticatedUser(() => ({
          ...data,
          password: password,
        }));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    console.log("Authenticated User: ", authenticatedUser);
  };

  const signOutUser = () => {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
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
