import { createContext, useState, useEffect } from "react";

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
