import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie List</h1>
        <Link className={"link-styles"} to="/dashboard">
          Dashboard
        </Link>
      </header>
      <p>
        Welcome to our Movie list where you can find and add some of your
        favorites movies to share with others!
      </p>
    </div>
  );
}

export default Home;
