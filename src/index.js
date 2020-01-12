import getMovie from './modules/getMovieRequest';
import searchMovie from './modules/searchRequest';
import Fulltext from './modules/fulltext';
import SearchComponent from './modules/search';

// Global variables
const fulltext = new Fulltext();
const searchComponent = new SearchComponent();

const searchInput = document.querySelector('.search__input');

// Fulltext searching
searchInput.addEventListener('input', () => {
  fulltext.reset();
  const value = searchComponent.getInputValue();
  if (value.length) {
    searchMovie(value)
      .then(data => {
        let resultsArray = data.results;
        let popularity = resultsArray.sort(
          (a, b) => b.popularity - a.popularity
        );
        let resultsID = popularity.map(result => {
          return result.id;
        });
        fulltext.setText(
          `Showing ${data.results.length} results of ${data.total_results} total`
        );
        resultsID.forEach(result => {
          getMovie(result)
            .then(data => {
              let title = data.title;
              let imgSrc = data.poster_path
                ? `https://image.tmdb.org/t/p/w92${data.poster_path}`
                : `./images/no-poster.png`;
              fulltext.setHTML(title, imgSrc);
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  }
});

// Event handler for input focus
searchComponent.focusToggle();

// Search for movie and display search results on the page after submit
searchComponent.searchAndDisplayResults();

// After click on the search results, load data of clicked movie and display it in the movie box
searchComponent.setHTMLFromResult();
