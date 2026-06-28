import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`https://movie-finder-43pb.onrender.com//api/watchlist`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWatchlist(data);
      });
  }, []);

  const [search, setSearch] = useState("");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              setSearch={setSearch}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />
        <Route
          path="/Movie/:id"
          element={
            <MovieDetails watchlist={watchlist} setWatchlist={setWatchlist} />
          }
        />
        <Route
          path="/Watchlist"
          element={
            <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
