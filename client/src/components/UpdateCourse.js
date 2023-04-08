import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
  const { courses } = useContext(CourseContext);
  const { authenticatedUser } = useContext(UserContext);

  // Parameter to Get Single Course by ID
  const { id } = useParams();
  const convertedId = parseInt(id);

  const selectedCourse = courses
    .filter((course) => course.id === convertedId)
    .map((newCourse) => {
      return newCourse;
    });

  //Set State for Each Input Field
  let [title, setTitle] = useState(selectedCourse[0].title);
  let [description, setDescription] = useState(selectedCourse[0].description);
  let [estimatedTime, setEstimatedTime] = useState(
    selectedCourse[0].estimatedTime
  );
  let [materialsNeeded, setMaterialsNeeded] = useState(
    selectedCourse[0].materialsNeeded
  );
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = async () => {
    await fetch(`http://localhost:5000/api/courses/${convertedId}`, {
      method: "PUT",
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
            return data.errors;
          });
        } else if (res.status === 404) {
          throw new Error("404");
        } else {
          throw new Error("505");
        }
      })
      .then((errors) =>
        errors.length ? setErrors(errors) : navigate(`/courses/${convertedId}`)
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {errors && errors.length > 0 ? (
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
        <div className="main--flex">
          <>
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>

              <p>
                By {selectedCourse.User?.firstName}{" "}
                {selectedCourse.User?.lastName}
              </p>

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
