import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies, getTrendingMovies, getGenres } from '../Services/tmdb';
import SkeltonCard from '../components/SkeltonCard'
import './Home.css'
import { motion } from 'framer-motion';

function Home({ search, setSearch, watchlist}) {

  const [searchResults, setSearchResults] = useState([]);
  const [popularmovies, setpopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [trendingmovies, setTrendingMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showGenrePanel, setShowGenrePanel] = useState(false);
  const [loadingSkelton, setLoadingSkelton] = useState(true);
  const [genres, setGenres] = useState([])


  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data);
    })
  }, [])

  useEffect(() => {
    getTrendingMovies().then((data) => {
      setTrendingMovies(data.slice(0, 10));
    });
  }, []);

  useEffect(() => {
    setLoadingSkelton(true);
    getPopularMovies(page).then((data) => {
      setpopularMovies((prevMovies) => [...prevMovies, ...data]);
      setLoadingSkelton(false);
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

  const filteredMovie = displayedMovies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenre === "" ||
      movie.genre_ids.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });


  return (
    <>
      {search.trim() === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroBanner movies={trendingmovies} />
        </motion.div>

      )}
      <div>
        
          <Navbar watchlist={watchlist} search= {search} setSearch={setSearch} setShowGenrePanel={setShowGenrePanel} />
          {search == ""}
       

        {showGenrePanel && (
          <div className="genre-overlay"
            onClick={() => setShowGenrePanel(false)}>
            <motion.div
              className="genre-panel"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
            >

              <h2>Select Genre</h2>

              <div className="genre-grid">
                {genres?.map((genre) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}


                    onClick={() => {
                      setSelectedGenre(genre.id);
                      setShowGenrePanel(false);

                    }}
                  >{genre.name}</motion.button>
                ))}

              </div>
            </motion.div>

            <div
              className="overlay-bg"
              onClick={() => setShowGenrePanel(false)}
            ></div>


          </div>
        )}
        <div className="movies-grid">
          {loadingSkelton ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeltonCard key={index} />
            ))
          ) : (
            filteredMovie.map((movie, id) => (
              <motion.div
                key={`${movie.id}-${id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}

              >
                <MovieCard
                  movie={movie}
                  genres={genres}
                  id={id}
                />
              </motion.div>
            ))
          )}
        </div>
        <button
          style={{
            padding: "10px 20px",
            margin: "20px auto",
            display: "block"
          }}
          onClick={() => setPage(page + 1)}>Load More</button>
      </div>
    </>

  );

}

export default Home;
