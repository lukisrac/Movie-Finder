const apikey = '373261c2e019afaac410f0659df23f81';

const searchMovie = async query => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default searchMovie;
