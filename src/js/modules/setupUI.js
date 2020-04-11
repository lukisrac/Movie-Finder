const movieBox = document.querySelector('.movie');
const movieImage = document.querySelector('.movie__image img');
const movieTitle = document.querySelector('.movie__title');
const movieGenres = document.querySelector('.movie__genre');
const movieDirector = document.querySelector('.director');
const movieWriters = document.querySelector('.writer');
const movieTime = document.querySelector('.time');
const movieRelease = document.querySelector('.release');
const movieCountry = document.querySelector('.country');
const movieLanguage = document.querySelector('.language');
const movieIMDBLink = document.querySelector('.imdb');
const movieOverview = document.querySelector('.overview');
const trailerBtn = document.querySelector('.trailer__button');
const trailerModal = document.querySelector('.modal__trailer');
const trailerClose = document.querySelector('.close-modal');
const trailerFrame = document.querySelector('.trailer iframe');
let trailerKey = null;

// Render movie box with passed data
const setupUI = (data) => {
  // Display movie title on the page
  movieTitle.textContent = data.title;

  // Return genres and display it on the page
  let genresArray = data.genres;
  let genresNames = genresArray
    .map((gen) => {
      return gen.name;
    })
    .join(', ');
  movieGenres.textContent = genresNames;

  // Return movie director and display it on the page
  let crewArray = data.credits.crew;
  let director = crewArray.filter((dir) => {
    return dir.department === 'Directing';
  });
  let directorName = director[0].name;
  movieDirector.innerHTML = `
    <span class="movie__label">Director:</span><span class="movie__label-text">${directorName}</span>
  `;

  // Return movie writers and display it on the page
  let writers = crewArray.filter((writer) => {
    return writer.department === 'Writing';
  });
  let writersNames = writers
    .map((writer) => {
      return writer.name;
    })
    .join(', ');
  movieWriters.innerHTML = `
    <span class="movie__label">Writer:</span><span class="movie__label-text">${writersNames}</span>
  `;

  // Display movie time on the page
  movieTime.innerHTML = `
    <span class="movie__label">Time:</span><span class="movie__label-text">${data.runtime}m</span>
  `;

  // Display movie release date on the page
  movieRelease.innerHTML = `
    <span class="movie__label">Release:</span><span class="movie__label-text">${data.release_date}</span>
  `;

  // Return origin countries and display it on the page
  let countriesArray = data.production_countries;
  let countriesNames = countriesArray
    .map((country) => {
      return country.name;
    })
    .join(', ');
  movieCountry.innerHTML = `
    <span class="movie__label">Country:</span><span class="movie__label-text">${countriesNames}</span>
  `;

  // Return movie language and display it on the page
  let languageArray = data.spoken_languages;
  let languageNames = languageArray
    .map((language) => {
      return language.name;
    })
    .join(', ');
  movieLanguage.innerHTML = `
    <span class="movie__label">Language:</span><span class="movie__label-text">${languageNames}</span>
  `;

  // Get IMDB link and display it on the page
  movieIMDBLink.innerHTML = `
    <span class="movie__label">IMDB Link:</span><span class="movie__label-text"><a href="https://www.imdb.com/title/${data.imdb_id}" target="_blank" class="movie__link">${data.imdb_id}</a></span>
  `;

  // Get movie summary and display it on the page
  movieOverview.innerHTML = `
  <span class="movie__label">Overview:</span><span class="movie__label-text">${data.overview}</span>
  `;

  // Get movie poster url and pass it to image source on the page
  let imgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  movieImage.setAttribute('src', imgUrl);

  // Open trailer modal with video frame
  const openTrailerModal = () => {
    // Get trailer key
    let trailerKey = data.videos.results[0].key;
    if (
      !trailerFrame.getAttribute('src') ||
      trailerFrame.getAttribute('src') !==
        `https://www.youtube.com/embed/${trailerKey}?enablejsapi=1`
    ) {
      trailerModal.classList.remove('d-none');
      trailerFrame.setAttribute(
        'src',
        `https://www.youtube.com/embed/${trailerKey}?enablejsapi=1`
      );
    } else {
      trailerModal.classList.remove('d-none');
    }
  };
  trailerBtn.addEventListener('click', openTrailerModal);

  // Close trailer modal with video frame
  const closeTrailerModal = (e) => {
    if (e.target === trailerClose || e.target === trailerModal) {
      trailerModal.classList.add('d-none');
      trailerFrame.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'stopVideo' }),
        '*'
      );
    }
  };
  trailerModal.addEventListener('click', closeTrailerModal);

  // Show the movie box after fetched data
  movieBox.classList.remove('d-none');
};

export default setupUI;
