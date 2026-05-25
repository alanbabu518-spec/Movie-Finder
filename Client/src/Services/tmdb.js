const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1, query) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&query=${query}`
  );

  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
};

export const getMovieCredits = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;

};
export const getMovieVideos = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;

};
export const getMovieImages = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;

};