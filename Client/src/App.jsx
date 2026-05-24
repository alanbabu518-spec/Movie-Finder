import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  const [watchlist, setWatchlist] = useState([])
  const[search,setSearch] = useState("")
  return (


    <Routes>

      <Route path='/' element={<Home 
           search={search}
           setSearch={setSearch}/>
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
      />
      }
      />

    </Routes>

  );

}


export default App;

