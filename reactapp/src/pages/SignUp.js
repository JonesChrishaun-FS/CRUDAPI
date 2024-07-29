import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.services";
import "../App.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  handleSignup = async (event) => {
    event.preventDefault();
    try {
      await AuthService.signup(email, password).then(
        (response) => {
          navigate("/dashboard");
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Signup</h1>
        <Link className={"link-styles"} to="/dashboard">
          Dashboard
        </Link>
        <section>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Signup</button>
          </form>
        </section>
      </header>
    </div>
  );
}

export default Signup;
