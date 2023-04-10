import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

//Create New User Since DB is formatted and try to create new course after model change in API
const CreateCourse = () => {
  const { authenticatedUser } = useContext(UserContext);
  // Set up State for Course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const submit = async () => {
    await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Basic " +
          btoa(
            `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
          ),
      },
    })
      .then((res) => {
        if (res.status === 204) {
          return [];
        } else if (res.status === 400) {
          return res.json().then((data) => {
            return setErrors(data);
          });
        } else if (res.status === 404) {
          throw new Error("404");
        } else {
          navigate("/");
        }
      })
      .then((errors) => (errors.length ? setErrors(errors) : navigate("/")))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors && errors.length !== 0 ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            ></input>

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={materialsNeeded}
              onChange={(e) => setMaterialsNeeded(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <Link to="/" className="button button-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;
