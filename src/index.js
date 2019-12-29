const apikey = '373261c2e019afaac410f0659df23f81';
const language = 'en-US';
const movieTitle = document.querySelector('.movie__title');
const movieGenres = document.querySelector('.movie__genre');
const movieDirector = document.querySelector('.director');
const movieWriters = document.querySelector('.writer');

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
  let crewArray = data.crew;
  // Return director and write it to the page
  let director = crewArray.filter(dir => {
    return dir.department === 'Directing';
  });
  let directorName = director[0].name;
  movieDirector.innerHTML = `
    <span class="movie__label">Director:</span><span class="movie__label-text">${directorName}</span>
  `;
  // Return writers and write it to the page
  let writers = crewArray.filter(writer => {
    return writer.department === 'Writing';
  });
  let writersNames = writers
    .map(writer => {
      return writer.name;
    })
    .join(', ');
  movieWriters.innerHTML = `
    <span class="movie__label">Writer:</span><span class="movie__label-text">${writersNames}</span>
  `;
});
