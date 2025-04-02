import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home"
import MovieDetails from "./components/MovieDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}
