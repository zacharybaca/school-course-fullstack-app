import { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const signInUser = (username, password) => {
    const newUser = {
      username,
      password,
    };
    setUsers(newUser);
  };

  const signOutUser = () => {
    setUsers(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
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
