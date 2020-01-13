import getMovie from './getMovieRequest';
import setupUI from './setupUI';

export default class Fulltext {
  constructor() {
    this.form = document.querySelector('.search__form');
    this.results = document.querySelector('.fulltext__results');
    this.placeholder = document.querySelector('.fulltext__placeholder');
  }
  setText(text) {
    this.placeholder.textContent = text;
  }
  loadMovie() {
    this.results.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      getMovie(id)
        .then(data => {
          this.form.reset();
          this.reset();
          setupUI(data);
        })
        .catch(err => console.log(err));
    });
  }
  setHTML(id, title, imgSrc) {
    this.results.innerHTML += `
      <div class="col-md-4 fulltext__result">
        <div class="fulltext__result-link" data-id="${id}"></div>
        <img src="${imgSrc}" class="fulltext__result-image" />
        <div class="fulltext__result-title">${title}</div>
      </div>
    `;
  }
  reset() {
    this.results.innerHTML = '';
    this.placeholder.textContent = 'No search results';
  }
}
