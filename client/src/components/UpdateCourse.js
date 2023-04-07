import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CourseContext from "../context/CourseContext";

const UpdateCourse = () => {
  const { courses } = useContext(CourseContext);

  const selectedCourse = courses
    .filter((course) => course.id === convertedId)
    .map((newCourse) => {
      return newCourse;
    });

  const [errors, setErrors] = useState([]);
  const [updatedCourse, setUpdatedCourse] = useState({
    title: selectedCourse.title,
    description: selectedCourse.description,
    estimatedTime: selectedCourse.estimatedTime,
    materialsNeeded: selectedCourse.materialsNeeded,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();

    setUpdatedCourse((updatedCourse) => ({
      ...updatedCourse,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/api/courses/:id/update", {
      method: "PUT",
      body: JSON.stringify({
        title: updatedCourse.title,
        description: updatedCourse.description,
        estimatedTime: updatedCourse.estimatedTime,
        materialsNeeded: updatedCourse.materialsNeeded,
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

  const navigate = useNavigate();

  // Parameter to Get Single Course by ID
  const { id } = useParams();
  const convertedId = parseInt(id);

  return (
    <div className="wrap">
      <h2>Update Course</h2>
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
          <>
            <div>
              <label forhtml="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={updatedCourse.title}
                onChange={handleChange}
              ></input>

              <p>
                By {updatedCourse.User?.firstName}{" "}
                {updatedCourse.User?.lastName}
              </p>

              <label forhtml="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={updatedCourse.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label forhtml="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={updatedCourse.estimatedTime}
                onChange={handleChange}
              ></input>

              <label for="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={updatedCourse.materialsNeeded}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <Link to="/" className="button button-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateCourse;
