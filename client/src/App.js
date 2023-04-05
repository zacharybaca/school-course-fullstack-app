import { useEffect, useState } from "react";
import Header from "./components/Header";
import Courses from "./components/Courses";

// Next, Create UserSignIn Component
function App() {
  return (
    <div className="App">
      <Header />
      <Courses />
    </div>
  );
}

export default App;
