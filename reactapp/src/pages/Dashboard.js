import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import AuthService from "../services/auth.services";
import moviesService from "../services/movies.service";

function Dashboard() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    available_on: "",
  });

  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    moviesService.getAllPrivateMovies().then(
      (response) => {
        setMovies(response.data);
      },
      (error) => {
        if (error.response && error.response.status == 403) {
          AuthService.logout();
          navigate("/login");
        }
      }
    );

    // if (!ignore) {
    //   getMovies();
    // }
    // return () => {
    //   ignore = true;
    // };
  }, []);

  const getMovies = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setMovies(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const createMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => getMovies());
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie();
  };

  const handleInputChanges = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List:</h1>
        <Link className={"link-styles"} to="/">
          Home
        </Link>
        <Link className={"link-styles"} to="/dashboard">
          Dashboard
        </Link>
      </header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChanges}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleInputChanges}
          />
        </label>
        <label>
          Available On:
          <input
            type="text"
            name="available_on"
            value={values.available_on}
            onChange={handleInputChanges}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie._id}>
              <Link className={"link"} to={`/movies/${movie._id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Dashboard;
