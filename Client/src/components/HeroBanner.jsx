import './HeroBanner.css'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'

function HeroBanner({ movies=[] }) {
  return (
    <div className="hero">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={false}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="hero-banner" style={{
              backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}>
              <div className="overlay">
              <h1>{movie.title}</h1>
              <p style={{color:"yellow"}}>{movie.vote_average?.toFixed(1)}</p>
              <p>{movie.overview.slice(0,200)}</p>
              <Link to={`/movie/${movie.id}`}>
              <button>View Details</button>
              </Link>
              </div>

            </div>
          </SwiperSlide>
      ))}

        
    </Swiper>

    </div>

  );
}

export default HeroBanner