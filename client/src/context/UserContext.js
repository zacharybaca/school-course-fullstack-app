import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? JSON.parse(cookie) : null
  );

  /* Sets a cookie called authenticatedUser to persist user login */
  Cookies.set("authenticatedUser", JSON.stringify(authenticatedUser), {
    expires: 1,
  });

  //const localDev = `http://localhost:5000/api/users`;
  const liveDev = `school-course-fullstack-app-production.up.railway.app/api/courses`;

  const navigate = useNavigate();
  const signInUser = async (emailAddress, password) => {
    await fetch(liveDev, {
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
  };

  /* Clears authenticatedUser state and removes stored cookie */
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
