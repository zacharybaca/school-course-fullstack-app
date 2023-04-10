import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";

// Start on Task 9 on Instructions List of Project
const CourseDetail = () => {
  const { courses } = useContext(CourseContext);
  const { authenticatedUser } = useContext(UserContext);
  // Try to get Update and Delete buttons to only show if user is logged in and owns the course

  // Parameter to Get Single Course by ID
  const { id } = useParams();
  const convertedId = parseInt(id);

  const courseBeingUpdated = courses
    .map((course) => course)
    .filter((course) => course.id === convertedId);

  return (
    <div className="actions--bar">
      <div className="wrap">
        {authenticatedUser &&
        authenticatedUser.id === courseBeingUpdated[0].userId ? (
          <>
            <Link to={`/courses/${convertedId}/update`} className="button">
              Update Course
            </Link>
            <Link to={`/courses/${convertedId}/update`} className="button">
              Delete Course
            </Link>
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
