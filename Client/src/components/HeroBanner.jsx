import './HeroBanner.css'

import 'swiper/css'
import 'swiper/css/autoplay'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

function HeroBanner() {
  return (
    <div className="hero">
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={1.05}
      centeredSlides={true}
      autoplay={{ delay: 2000,
        disableOnInteraction:false,
       }}
      loop={true}
      className="mySwiper"
    >

      <SwiperSlide>
        <div className="slide1">
          <div className="overlay">
            <h1>Discover Amazing Movies</h1>
            <p>Search And Explore Your Favorite Movies</p>
            <button>Explore</button>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slide2">
          <div className="overlay">
            <h1>Batman </h1>
            <p>Batman movies feature billionaire Bruce Wayne’s quest to rid Gotham City of crime as a caped vigilante.<br></br> The franchise spans various interpretations, from Tim Burton’s gothic and Christopher Nolan’s grounded realism to recent gritty, detective-driven narratives.</p>
            <button>Search Now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide3">
          <div className="overlay">
            <h1>Avengers</h1>
            <p>Directed by Christopher Nolan, Interstellar (2014) is a sci-fi epic set in a dystopian future where Earth's crops are failing and humanity faces extinction.<br></br>
             It follows a team of astronauts led by Cooper, who travel through a newly discovered wormhole in search of a new, habitable planet to colonize.</p>
            <button>Search Now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide4">
          <div className="overlay">
            <h1>Spiderman</h1>
            <p>Directed by Christopher Nolan, Interstellar (2014) is a sci-fi epic set in a dystopian future where Earth's crops are failing and humanity faces extinction.<br></br>
             It follows a team of astronauts led by Cooper, who travel through a newly discovered wormhole in search of a new, habitable planet to colonize.</p>
            <button>Search Now</button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide5">
          <div className="overlay">
            <h1>Deadpool</h1>
            <p>Directed by Christopher Nolan, Interstellar (2014) is a sci-fi epic set in a dystopian future where Earth's crops are failing and humanity faces extinction.<br></br>
             It follows a team of astronauts led by Cooper, who travel through a newly discovered wormhole in search of a new, habitable planet to colonize.</p>
            <button>Search Now</button>
          </div>
        </div>
      </SwiperSlide>

    </Swiper>
    </div>

  )
}

export default HeroBanner