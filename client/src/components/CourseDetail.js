import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";

const CourseDetail = () => {
  // Get List of Courses from API and current logged in User
  const { courses } = useContext(CourseContext);
  const { authenticatedUser } = useContext(UserContext);

  // Parameter to Get Single Course by ID
  const { id } = useParams();
  const convertedId = parseInt(id);

  //const localDev = `http://localhost:5000/api/courses/${convertedId}`;
  const liveDev = `school-course-fullstack-app-production.up.railway.app/api/courses/${convertedId}`;

  const navigate = useNavigate();

  // Gets the course that is being updated using the URL params
  const courseBeingUpdated = courses
    .map((course) => course)
    .filter((course) => course.id === convertedId);

  const deleteCourse = async () => {
    await fetch(liveDev, {
      method: "DELETE",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
          ),
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Delete Successful");
        navigate("/");
      } else {
        throw new Error();
      }
    });
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        {/* Checks if authenticatedUser ID matches the Course's UserId */}
        {authenticatedUser &&
        authenticatedUser.id === courseBeingUpdated[0].userId ? (
          <>
            <Link to={`/courses/${convertedId}/update`} className="button">
              Update Course
            </Link>
            <button type="submit" onClick={deleteCourse} className="button">
              Delete Course
            </button>
          </>
        ) : null}

        <Link to="/" className="button button-secondary">
          Return to List
        </Link>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            {/* Filters the course being updated by URL params */}
            {courses
              .filter((course) => course.id === convertedId)
              .map((course) => (
                <>
                  <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>
                      By {course.User?.firstName} {course.User?.lastName}
                    </p>
                    <ReactMarkdown children={course.description} />
                  </div>

                  <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      <ReactMarkdown children={course.materialsNeeded} />
                    </ul>
                  </div>
                </>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
