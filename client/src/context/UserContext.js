import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();

  let cookie = Cookies.get("authenticatedUser");

  useEffect(() => {
    setAuthenticatedUser(cookie ? JSON.parse(cookie) : null);
  }, [cookie]);

  const signInUser = async (emailAddress, password) => {
    await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic" + btoa(`${emailAddress}:${password}`),
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
          setAuthenticatedUser(data);
          setAuthenticatedUser((prevState) => ({
            ...prevState,
            password: password,
          }));
          Cookies.set("authenticatedUser", JSON.stringify(authenticatedUser), {
            expires: 1,
          });
          console.log(authenticatedUser);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
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
