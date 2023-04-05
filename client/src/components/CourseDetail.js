import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import CourseContext from "../context/CourseContext";

// Start Setting up Routes for Components in Order to Get Single Course by Id using useParams hook
const CourseDetail = () => {
  const { courses } = useContext(CourseContext);

  // Parameter to Get Single Course by ID
  const { id } = useParams();

  return (
    <div className="actions--bar">
      <div className="wrap">
        <Link to="/api/updatecourse" className="button">
          Update Course
        </Link>
        <Link to="/api/deletecourse" className="button">
          Delete Course
        </Link>
        <Link to="/" className="button button-secondary">
          Return to List
        </Link>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <>
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">Title</h4>
                <p>Description</p>
              </div>

              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>Estimated Time</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <li>Materials Needed</li>
                </ul>
              </div>
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
