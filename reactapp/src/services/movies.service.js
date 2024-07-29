import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8000/api/v1/movies";

const getAllPrivateMovies = () => {
  return axios.get("/", { headers: authHeader() });
};

const moviesService = {
  getAllPrivateMovies,
};

export default moviesService;
