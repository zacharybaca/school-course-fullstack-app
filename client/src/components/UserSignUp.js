import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";

const UserSignUp = () => {
  const [errors, setErrors] = useState([]);

  const { actions } = useContext(UserContext);

  const [userSignUp, setUserSignUp] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    event.preventDefault();

    setUserSignUp((userSignUp) => ({
      ...userSignUp,
      [name]: value,
    }));
  };

  const submit = async () => {
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      body: JSON.stringify(userSignUp),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          actions.userSignIn(userSignUp.emailAddress, userSignUp.password);
          return [];
        } else if (res.status === 400) {
          return res.json().then((data) => {
            return data.errors;
          });
        } else {
          throw new Error(
            "Error: There was an issue processing this request with the server"
          );
        }
      })
      .then((errors) => (errors ? setErrors(errors) : console.log("")))
      .catch((err) => {
        console.log("Error signing up", err);
      });
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      {errors && errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={submit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={userSignUp.firstName}
          onChange={handleChange}
        ></input>

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={userSignUp.lastName}
          onChange={handleChange}
        ></input>

        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={userSignUp.emailAddress}
          onChange={handleChange}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={userSignUp.password}
          onChange={handleChange}
        ></input>

        <button className="button" type="submit">
          Sign Up
        </button>
        <Link to="/" className="button button-secondary">
          Cancel
        </Link>
      </form>
      <p>
        Already have a user account? Click here to{" "}
        <Link to="/signin">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
