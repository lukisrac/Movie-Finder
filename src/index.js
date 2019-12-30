const apikey = '373261c2e019afaac410f0659df23f81';
const language = 'en-US';
const movieImage = document.querySelector('.movie__image img');
const movieTitle = document.querySelector('.movie__title');
const movieGenres = document.querySelector('.movie__genre');
const movieDirector = document.querySelector('.director');
const movieWriters = document.querySelector('.writer');
const movieTime = document.querySelector('.time');
const movieRelease = document.querySelector('.release');
const movieCountry = document.querySelector('.country');
const movieLanguage = document.querySelector('.language');

// Open trailer modal
const trailerBtn = document.querySelector('.trailer__button');
const trailerModal = document.querySelector('.modal__trailer');
trailerBtn.addEventListener('click', () => {
  trailerModal.classList.remove('d-none');
});

// Close trailer modal
const trailerClose = document.querySelector('.close-modal');
trailerModal.addEventListener('click', e => {
  if (e.target === trailerClose || e.target === trailerModal) {
    trailerModal.classList.add('d-none');
  }
});

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

getMovie('27205')
  .then(data => {
    // Display movie title on the page
    movieTitle.textContent = data.title;

    // Return genres and display it on the page
    let genresArray = data.genres;
    let genresNames = genresArray
      .map(gen => {
        return gen.name;
      })
      .join(', ');
    movieGenres.textContent = genresNames;

    // Display movie time on the page
    movieTime.innerHTML = `
      <span class="movie__label">Time:</span><span class="movie__label-text">${data.runtime}m</span>
    `;

    // Display movie release date on the page
    movieRelease.innerHTML = `
      <span class="movie__label">Release:</span><span class="movie__label-text">${data.release_date}</span>
    `;

    // Return origin countries and display it on the page
    countriesArray = data.production_countries;
    countriesNames = countriesArray
      .map(country => {
        return country.name;
      })
      .join(', ');
    movieCountry.innerHTML = `
      <span class="movie__label">Country:</span><span class="movie__label-text">${countriesNames}</span>
    `;

    // Return movie language and display it on the page
    let languageArray = data.spoken_languages;
    let languageNames = languageArray
      .map(language => {
        return language.name;
      })
      .join(', ');
    movieLanguage.innerHTML = `
      <span class="movie__label">Language:</span><span class="movie__label-text">${languageNames}</span>
    `;

    // Get movie poster url and pass it to image source on the page
    let imgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    movieImage.setAttribute('src', imgUrl);
  })
  .catch(err => console.log(err));

getCredits('27205').then(data => {
  let crewArray = data.crew;

  // Return movie director and display it on the page
  let director = crewArray.filter(dir => {
    return dir.department === 'Directing';
  });
  let directorName = director[0].name;
  movieDirector.innerHTML = `
    <span class="movie__label">Director:</span><span class="movie__label-text">${directorName}</span>
  `;

  // Return movie writers and display it on the page
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
