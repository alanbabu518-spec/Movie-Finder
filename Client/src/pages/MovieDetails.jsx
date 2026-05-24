import movies from '../data/movies';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

function MovieDetails({ watchlist, setWatchlist }) {
    const { id } = useParams();
    const movie = movies[id];
    const addtoWatchlist = () => {
        setWatchlist([
            ...watchlist,
            movie
        ]);
        alert("movie added to watchlist");
    }
    return (
        <div className="moviedetails" style={{ backgroundImage: `url(${movie.image})` }}>
            <Navbar />
            <div className='overlap'>
                <div className="content">
                    <h1>{movie.title}</h1>
                    <div className="meta">
                        <h4>{movie.Rating}</h4>
                        <p>{movie.genre}</p>
                    </div>
                    <p>A shy high-school student, Peter Parker, gains extraordinary spider-like abilities after being bitten by a genetically modified spider.
                        <br></br>He must learn to balance his ordinary life with his responsibility to protect New York City as Spider-Man.</p>

                    <button onClick={addtoWatchlist}>Add To Watchlis</button>
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
    );
}
export default MovieDetails
