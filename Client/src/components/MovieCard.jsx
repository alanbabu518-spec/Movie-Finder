import './MovieCard.css';
import { Link } from "react-router-dom";


function MovieCard({ movie, id }) {
    console.log(movie)
    return (
        <div className="container">
            <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: 'none' }}

            >

                <div className="movie-card" key={id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-info">
                        <h2>{movie.title}</h2>
                        <h4>{movie.vote_average}</h4>
                        <p>{movie.release_date}</p>
                    </div>


                </div>
            </Link>

        </div>
    );
}

export default MovieCard