import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/courses/create"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:id/update"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
      </Routes>
    </div>
  );
}

export default App;
