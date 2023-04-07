import { useRef, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);

  const navigate = useNavigate();

  // State
  const emailAddress = useRef(null);
  const password = useRef(null);

  // Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    actions.signIn(emailAddress.current.value, password.current.value);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          required
          ref={emailAddress}
          name="emailAddress"
          type="email"
          placeholder="Email Address"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          required
          ref={password}
          name="password"
          type="password"
          placeholder="Password"
        ></input>
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
