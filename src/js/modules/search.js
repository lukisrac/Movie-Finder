import searchMovie from './searchRequest';
import getMovie from './getMovieRequest';
import Fulltext from './fulltext';
import setupUI from './setupUI';
import noPosterUrl from '../../images/no-poster.png';

const fulltext = new Fulltext();
const movieBox = document.querySelector('.movie');
let trailerKey = null;

export default class SearchComponent {
  constructor() {
    this.searchWrapper = document.querySelector('.sr-wrapper');
    this.searchBox = document.querySelector('.search__box');
    this.searchForm = document.querySelector('.search__form');
    this.searchInput = document.querySelector('.search__input');
  }
  focusToggle() {
    document.addEventListener('click', (e) => {
      if (e.target === this.searchInput) {
        this.searchBox.classList.add('focus');
      } else {
        this.searchBox.classList.remove('focus');
      }
    });
  }
  clearWrapper() {
    this.searchWrapper.innerHTML = '';
  }
  getInputValue() {
    const value = encodeURI(this.searchInput.value);
    return value;
  }
  setHTMLFromResult() {
    this.searchWrapper.addEventListener('click', (e) => {
      let movieID = e.target.parentElement.parentElement.getAttribute(
        'data-id'
      );
      this.searchWrapper.innerHTML = '';
      getMovie(movieID)
        .then((data) => {
          setupUI(data);
        })
        .catch((err) => console.log(err));
    });
  }
  searchAndDisplayResults() {
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.clearWrapper();
      trailerKey = null;
      movieBox.classList.add('d-none');
      const value = this.getInputValue();
      searchMovie(value)
        .then((data) => {
          this.searchForm.reset();
          fulltext.reset();
          let resultsArray = data.results;
          let popularity = resultsArray.sort(
            (a, b) => b.popularity - a.popularity
          );
          let resultsID = popularity.map((result) => {
            return result.id;
          });
          resultsID.forEach((result) => {
            getMovie(result)
              .then((data) => {
                let imgSrc = data.poster_path
                  ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
                  : noPosterUrl;
                this.searchWrapper.innerHTML += `
                  <div class="col-2 search__result-wrapper">
                    <div class="search__result" data-id="${data.id}">
                      <h4 class="search__result-title">${data.title}</h4>
                      <div class="search__result-image" style="background: url('${imgSrc}');"></div>
                      <div class="more">
                        <h4 class="title">${data.title}</h4>
                        <span class="plus-icon">&#43;</span>
                      </div>
                    </div>
                  </div>
                `;
              })
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    });
  }
}
