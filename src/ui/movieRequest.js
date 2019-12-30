const apikey = '373261c2e019afaac410f0659df23f81';
const language = 'en-US';

export const getMovie = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&append_to_response=videos`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getCredits = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
