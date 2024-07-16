import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Movie() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    available_on: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getMovie();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getMovie = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValues({
            title: data.title,
            description: data.description,
            available_on: data.available_on,
          });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async () => {
    try {
      await fetch(`${API_BASE}/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie();
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
        <h1>{values && values.title}</h1>
        <button onClick={() => deleteMovie}>Delete</button>
        <Link className={"link-styles"} to="/dashboard">
          Dashboard
        </Link>
        <Link className={"link-styles"} to="/">
          Home
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

      <p>{values && values.description}</p>
      <p>{values && values.available_on}</p>
    </div>
  );
}

export default Movie;
