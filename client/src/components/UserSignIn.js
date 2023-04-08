import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);

  // State
  const [credentials, setCredentials] = useState({
    emailAddress: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();

    setCredentials((creds) => ({
      ...creds,
      [name]: value,
    }));
  };

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.signIn(credentials.emailAddress, credentials.password);
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          required
          value={credentials.emailAddress}
          name="emailAddress"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          required
          value={credentials.password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <button className="button" type="submit">
          Sign In
        </button>
        <Link to="/" className="button button-secondary">
          Cancel
        </Link>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
