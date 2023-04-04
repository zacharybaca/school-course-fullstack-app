import { useEffect, useState } from "react";
import "./App.css";

// For next step in project: Test REST API in React Project
function App() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  });
  return (
    <div className="App">
      <ul>
        {courses.map((course) => (
          <li>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
