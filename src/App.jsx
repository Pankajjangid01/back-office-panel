import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import TaskLists from "./components/TaskLists";
import Tasks from "./components/Tasks";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/task-lists" element={<TaskLists />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
