import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { CourseProvider } from "./context/CourseContext";

import "./styles/reset.css";
import "./styles/global.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
/* Context Provider components wrap the main App component for global state access */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
