
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from '../Services/tmdb';

function Home(props) {
  const { search, setSearch } = props;
  const [searchResults, setSearchResults] = useState([]);


  const [popularmovies, setpopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPopularMovies(page).then((data) => {
      setpopularMovies((prevMovies) => [...prevMovies, ...data]);

    });
  }, [page])

  useEffect(() => {
    if (!search) return;
    searchMovies(search).then((data) => {
      setSearchResults(data);

    });
  }, [search])

  const displayedMovies =
    search.trim() === "" ?
      popularmovies
      : (searchResults || []);


  const filteredMovie = displayedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())

  );
  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      {search == "" && <HeroBanner />}
      <div className="movies-grid">

        {filteredMovie.map((movie, id) => (
          <MovieCard
            key={id}
            movie={movie}
            id={id}
          />
        ))}
      </div>
      <button
        style={{
          padding: "10px 20px",
          margin: "20px auto",
          display: "block"
        }}
        onClick={() => setPage(page + 1)}>Load More</button>


    </div>

  );
}


export default Home;