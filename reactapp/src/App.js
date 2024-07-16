import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Movie from "./pages/Movie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" exact element={<Movie />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
