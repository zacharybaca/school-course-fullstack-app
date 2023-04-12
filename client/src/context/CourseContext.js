import { createContext, useState, useEffect } from "react";

const CourseContext = createContext(null);

export const CourseProvider = (props) => {
  const [courses, setCourses] = useState([]);

  //const localDev = `http://localhost:5000/api/courses`;
  //const liveDev = `school-course-fullstack-app-production.up.railway.app/api/courses`;

  /* Fetches list of courses from API and adds them to courses array */
  useEffect(() => {
    fetch(`school-course-fullstack-app-production.up.railway.app/api/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, [courses]);

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
