import { useContext } from "react";
import CourseContext from "../context/CourseContext";
import { Link } from "react-router-dom";

const Courses = () => {
  const { courses } = useContext(CourseContext);
  return (
    <div className="wrap main--grid">
      {courses.map((course) => {
        return (
          <Link to="/api/courses/:id" className="course--module course--link">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        );
      })}
      <Link
        to="/api/createcourse"
        className="course--module course--add--module"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmins="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;
