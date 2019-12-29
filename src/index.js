const apikey = '373261c2e019afaac410f0659df23f81';
const language = 'en-US';
const movieTitle = document.querySelector('.movie__title');
const movieGenres = document.querySelector('.movie__genre');
const movieDirector = document.querySelector('.director');

const getMovie = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=${language}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getCredits = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

getMovie('181812')
  .then(data => {
    console.log(data);
    movieTitle.textContent = data.title;
    let genresArray = data.genres;
    let genresNames = genresArray
      .map(gen => {
        return gen.name;
      })
      .join(', ');
    movieGenres.textContent = genresNames;
  })
  .catch(err => console.log(err));

getCredits('181812').then(data => {
  console.log(data.crew);
  let crewArray = data.crew;
  let crewDepartures = crewArray.filter(dep => {
    return dep.department === 'Directing';
  });
  let crewDirector = crewDepartures[0].name;
  console.log(crewDirector);
  movieDirector.innerHTML = `
  <span class="movie__label">Director:</span>${crewDirector}
  `;
});
