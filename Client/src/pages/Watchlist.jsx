import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import BASE_URL from "../Services/api";
import { useState, useEffect } from "react";

function Watchlist({ watchlist, setWatchlist }) {

  const removeMovie = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/watchlist/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    setWatchlist(watchlist.filter((movie) => movie._id !== id));
    toast.success("Removed from watchlist");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE_URL}/api/watchlist`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWatchlist(data);
      });
  }, []);

  if (watchlist.length === 0) {
    return (
      <>
        <Navbar />
        <h2
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "120px",
            paddingTop: "150px",
          }}
        >
          No Movies Added Yet
          <br />
          Start Exploring Now
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar watchlist={watchlist} search="" setSearch={() => {}} />
      <div className="table" style={{ color: "white", paddingTop: "100px", paddingLeft: "40px" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>My Watchlist</h1>
        <table
          className="list"
          border="1"
          cellPadding="5"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead style={{ color: "red" }}>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Overview</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((movie, idx) => (
              <tr key={movie._id || idx}>
                <td>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                    alt=""
                    width="70"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.rating}</td>
                <td>{movie.overview}</td>
                <td>
                  <button
                    onClick={() => removeMovie(movie._id)}
                    style={{
                      background: "#e50914",
                      padding: 10,
                      margin: 0,
                      height: 40,
                      border: "none",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;

