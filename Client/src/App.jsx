import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];

  });
  useEffect(() => {
    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  const [search, setSearch] = useState("")
  return (


    <Routes>

      <Route path='/' element={<Home
        search={search}
        setSearch={setSearch}
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />

      }
      />

      <Route path='/Movie/:id' element={<MovieDetails
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />
      }
      />
      <Route path="/Watchlist" element={<Watchlist
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />
      }
      />

    </Routes>

  );

}


export default App;

