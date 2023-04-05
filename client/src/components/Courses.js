import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);
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
    </div>
  );
};

export default Courses;
