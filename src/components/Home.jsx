import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../utils";

export default function Home() {
    const [title, setTitle] = useState(localStorage.getItem("searchTitle") || "");
    const [movies, setMovies] = useState(
        JSON.parse(localStorage.getItem("searchResults")) || []
    );
    const [loading, setLoading] = useState(false);


    console.log(url)
    const fetchMovies = async (searchTitle) => {
        if (!searchTitle) return;

        try {
            setLoading(true);
            const res = await axios.post(`${url}/search`, { title: searchTitle });
            const movieData = res.data || [];

            localStorage.setItem("searchTitle", searchTitle);
            localStorage.setItem("searchResults", JSON.stringify(movieData));

            setMovies(movieData);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold mb-4">🎬 Movie Search</h1>

            <div className="flex gap-2 items-center justify-center">
                <input
                    type="text"
                    placeholder="Enter movie title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={() => fetchMovies(title)}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {/* Show loading spinner instead of movie cards */}
            {loading ? (
                <div className="mt-6 text-lg font-semibold">Loading...</div>
            ) : (
                <div className= {movies.length<1? "":"mt-4 grid grid-cols-3 gap-4"} >
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <Link
                                key={movie.imdbID}
                                className="flex items-center gap-2 p-2 border rounded mb-2 cursor-pointer hover:bg-blue-200"
                                to={`/movie/${movie.imdbID}`}
                            >
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h2 className="font-semibold">{movie.Title}</h2>
                                    <p className="text-gray-600">{movie.Year}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="mt-4 w-full flex justify-center">Try searching for movies⬆️</div>
                    )}
                </div>
            )}
        </div>
    );
}
