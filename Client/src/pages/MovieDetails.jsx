import { data } from 'react-router-dom';
import './MovieDetails.css';
import Navbar from '../components/Navbar'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits, getMovieImages, getMovieVideos } from '../Services/tmdb';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function MovieDetails({ watchlist, setWatchlist }) {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [image, setImage] = useState([]);

    useEffect(() => {
        getMovieDetails(id).then((data) => {
            setMovie(data);
        })
    }, [id])

    useEffect(() => {
        getMovieDetails(id).then(setMovie);

        getMovieCredits(id).then((data) => {
            setCast(data.cast.slice(0.8));
        });

        getMovieVideos(id).then((data) => {
            const trailerVideo = data.results.find(
                (video) =>
                    video.type === "Trailer" &&
                    video.site === "YouTube"
            );

            setTrailer(trailerVideo);
        });

        getMovieImages(id).then((data) => {
            setImage(data.backdrops.slice(0, 6));
        });
    }, [id])

    const addtoWatchlist = () => {
        const exists = watchlist.find(
            (items) => items.id === movie.id
        );
        if (!exists) {
            setWatchlist([...watchlist, movie])
            toast.success("added to watchlist");
        } else {
            toast.warning("movie already exists");
        }

    }


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

                        <button onClick={addtoWatchlist}>Add To Watchlist</button>
                        <Link to={'/Watchlist'} style={{
                            textDecoration: 'none', color: '#fff',
                            padding: 10,

                            margin: 0,
                            height: 60,
                        }}>
                            View Watchlist
                        </Link>
                    </div>
                </div>
            </div>


            <div className="movie-extra">
                <h2>Cast</h2>
                <div className="cast-grid">
                    {cast?.map((actor) => (
                        <div key={actor.id}>
                            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} />
                            <p>{actor.name}</p>
                        </div>

                    ))};

                </div>

                <h2>Trailer</h2>
                {trailer && (
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title='Trailer'
                        allowFullScreen
                    />
                )}

                <h2>Images</h2>
                <div className="gallery">
                    {image?.map((img) => (
                        <img key={img.file_path}
                            src={`https://image.tmdb.org/t/p/w500${img.file_path}`} alt='' />
                    ))}
                </div>

            </div>
        </>

    );
}
export default MovieDetails


