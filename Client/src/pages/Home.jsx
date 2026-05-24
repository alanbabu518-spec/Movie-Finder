
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';


function Home(props) {
  const {search,setSearch} = props;
  const filteredMovie = movies.filter((movie) => 
    movie.title.toLowerCase().includes((search || "").toLowerCase())
  
  
  
  );
  return (
    <div>
      <Navbar  search={search} setSearch={setSearch}/>
      { search== "" && <HeroBanner />}
      <div className="movies-grid">

        {filteredMovie.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            id={index}
          />
        ))}
      </div>
      
      
    </div>
  );
}


export default Home;