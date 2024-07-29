import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import authService from "./services/auth.services";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };
  return (
    <div>
      <div>{currentUser ? <h2>Logged In</h2> : <h2>Logged Out</h2>}</div>
      <section>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/movies/:id" exact element={<Movie />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
