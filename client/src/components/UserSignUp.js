import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";

const UserSignUp = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [emailAddress, setEmailAddress] = useState("");
  let [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /* Get actions from UserContext for signin/signout/signup functionality */
  const { actions } = useContext(UserContext);

  //const localDev = `http://localhost:5000/api/users`;
  const liveDev = `https://school-course-fullstack-app-production.up.railway.app/api/users`;

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const submit = async () => {
    await fetch(liveDev, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          actions.signIn(emailAddress, password);
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
      .then((errors) => (errors.length ? setErrors(errors) : console.log("")))
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>

        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
