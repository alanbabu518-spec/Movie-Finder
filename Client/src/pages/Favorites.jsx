import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "./favorite.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const headers = {
      "Authorization": `Bearer ${token}`,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFavorites(data);
      });

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/watchlist`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWatchlist(data);
      });
  }, []);

  const removeFavorite = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    setFavorites(favorites.filter((movie) => movie._id !== id));
    toast.success("Removed from favorites");
  };

  if (favorites.length === 0) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "150px",
          }}
        >
          No Favorite Movies Yet
          <br />
          Start Exploring Now
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar watchlist={watchlist} />

      <div className="favorites-page">
        <h1 className="favorites-title">My Favorites</h1>

        <div className="favorite-grid">
          {favorites.map((movie) => (
            <div className="favorite-card" key={movie._id}>
              <button
                className="remove-btn"
                onClick={() => removeFavorite(movie._id)}
              >
                ✕
              </button>

              <Link to={`/Movie/${movie.movieId}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;

