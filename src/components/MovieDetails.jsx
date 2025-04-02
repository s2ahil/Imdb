import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../utils";
export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(`${url}/movie/${id}`);
                setMovie(res.data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p className="text-center mt-4 text-lg">Loading...</p>;

    return (
        <div className="p-6 mx-auto max-w-4xl flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-center">🎬 Movie Details</h1>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full md:w-1/3 h-96 object-contain rounded shadow-lg p-2"
                />
                <div className="flex-1">
                    <h2 className="text-3xl font-semibold">{movie.Title} ({movie.Year})</h2>
                    <div className="mt-4 space-y-3 text-lg">
                        <p><span className="font-semibold">📖 Plot:</span> {movie.Plot}</p>
                        <p><span className="font-semibold">🎭 Actors:</span> {movie.Actors}</p>
                        <p><span className="font-semibold">🎬 Director:</span> {movie.Director}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
