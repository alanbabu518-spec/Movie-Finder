import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie, genres }) {
    const movieGenres = genres && movie.genre_ids?movie.genre_ids.map((id) => genres.find((g) => g.id === id)?.name).filter(Boolean).slice(0, 2).join(" . ")
    : "";
    return (
        <Link
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none" }}
        >
            <div className="movies-grid">
                <div className="movie-card">

                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div className="movie-info">

                        <h3 className="movie-title">
                            {movie.title}
                        </h3>

                        <p className="movie-genre">
                            {movieGenres}
                        </p>

                        <p className="movie-rating">
                            ⭐ {movie.vote_average?.toFixed(1)}
                        </p>

                    </div>

                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
