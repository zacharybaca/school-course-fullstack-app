import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = () => {
  // Set up State for Course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const value = event.target.value;

    if (name === "courseTitle") {
      setTitle(value);
    } else if (name === "courseDescription") {
      setDescription(value);
    } else if (name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (name === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/api/courses/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        estimatedTime: estimatedTime,
        materialsNeeded: materialsNeeded,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
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
        <div className="main--flex">
          <div>
            <label forhtml="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={title}
              onChange={handleChange}
            ></input>

            <label forhtml="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label forhtml="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={handleChange}
            ></input>

            <label forhtml="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={materialsNeeded}
              onChange={handleChange}
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
