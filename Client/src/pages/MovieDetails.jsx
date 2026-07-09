import './MovieDetails.css';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits, getMovieImages, getMovieVideos, getSimilarMovies } from '../Services/tmdb';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from './ErrorPage';
import { FaPlay, FaBookmark, FaHeart, FaUser } from "react-icons/fa";
import MovieCard from '../components/MovieCard';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import ReviewBottomSheet from '../components/ReviewBottomSheet';
import BASE_URL from '../Services/api';

function MovieDetails({ watchlist, setWatchlist, genres }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [image, setImage] = useState([]);
    const [error, setError] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [showReviewBottomSheet, setShowReviewBottomSheet] = useState(false);

    useEffect(() => {
        getMovieDetails(id).then(setMovie)
            .catch(() => { setError(true) });

        getMovieCredits(id).then((data) => {
            if (data.cast) {
                setCast(data.cast.slice(0, 8)); // FIX: was slice(0.8)
            }
        }).catch(() => setError(true));

        getSimilarMovies(id).then((data) => {
            setSimilarMovies(data || []);
        }).catch(() => setError(true));

        getMovieVideos(id).then((data) => {
            if (data.results) {
                const trailerVideo = data.results.find(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(trailerVideo);
            }
        }).catch(() => setError(true));

        getMovieImages(id).then((data) => {
            if (data.backdrops) {
                setImage(data.backdrops.slice(0, 6));
            }
        }).catch(() => setError(true));
    }, [id]);

    if (error) {
        return <ErrorPage />;
    }

    const addtoWatchlist = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to add to watchlist");
            return;
        }

        const response = await fetch(`${BASE_URL}/api/watchlist`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                movieId: movie.id,
                poster: movie.poster_path,
                title: movie.title,
                overview: movie.overview,
                rating: movie.vote_average,
                genre: movie.genres.map(g => g.name).join(","),
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message);
            return;
        }
        toast.success("Added to watchlist");
    };

    const AddToFavorites = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to add to favorites");
            return;
        }

        const response = await fetch(`${BASE_URL}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                movieId: movie.id,
                title: movie.title,
                poster: movie.poster_path,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message);
            return;
        }
        toast.success("Added to Favorites");
    };

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
        setReviews(savedReviews);
    }, [id]);

    const addReview = (newReview) => {
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    };

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : "0.0";

    const deleteReview = (reviewId) => {
        const updatedReviews = reviews.filter(review => review.id !== reviewId);
        setReviews(updatedReviews);
        localStorage.setItem(`reviews-${movie.id}`, JSON.stringify(updatedReviews));
    };

    const editReview = (review) => {
        console.log("Edit review:", review);
    };

    if (!movie) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar watchlist={watchlist} />
            <div className="moviedetails" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                <div className='overlap'>
                    <div className="content">
                        <h1>{movie.title}</h1>
                        <div className="meta">
                            <h4>Rating: {movie.vote_average?.toFixed(1)}</h4>
                            <p>{movie.release_date}</p>
                        </div>
                        <p>{movie.overview}</p>
                        <p>{movie.genres?.map((genre) => genre.name).join(", ")}</p>
                        <p>{movie.runtime} min</p>

                        <div className="movie-actions">
                            <div className="action-icon">
                                <button onClick={() => {
                                    document.getElementById("trailer-section")
                                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}>
                                    <i><FaPlay /></i>
                                </button>
                                <span className="tooltip">Watch Trailer</span>
                            </div>
                            <div className="action-icon">
                                <button onClick={addtoWatchlist}>
                                    <i><FaBookmark /></i>
                                </button>
                                <span className="tooltip">Add to Watchlist</span>
                            </div>
                            <div className="action-icon">
                                <button onClick={AddToFavorites}>
                                    <i><FaHeart /></i>
                                </button>
                                <span className="tooltip">Add to Favorites</span>
                            </div>
                            <div className="action-icon">
                                <button onClick={() => setShowReviewBottomSheet(true)}>
                                    <i><FaUser /></i>
                                    <span className="tooltip">User Reviews</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cast-section">
                <h2>Actors</h2>
                <div className="cast-grid">
                    {cast.map((actor) => (
                        <div className="cast-card" key={actor.id}>
                            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                            <div className="cast-info">
                                <h4>{actor.name}</h4>
                                <p>{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="movie-extra">
                <h2>Similar Movies</h2>
                <div className="similar-container">
                    {similarMovies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} genres={movie.genres} />
                    ))}
                </div>
            </div>

            {showReviewBottomSheet && (
                <ReviewBottomSheet
                    reviews={reviews}
                    averageRating={averageRating}
                    onClose={() => setShowReviewBottomSheet(false)}
                    onAddReview={addReview}
                    onDelete={deleteReview}
                    onEdit={editReview}
                />
            )}

            <div className="movie-extra">
                <h2>Trailer</h2>
                <div id="trailer-section" className="trailer-container">
                    {trailer && (
                        <iframe
                            width="100%"
                            height="600"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title='Trailer'
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default MovieDetails;
