export default class Fulltext {
  constructor() {
    this.results = document.querySelector('.fulltext__results');
    this.placeholder = document.querySelector('.fulltext__placeholder');
  }
  setText(text) {
    this.placeholder.textContent = text;
  }
  setHTML(title, imgSrc) {
    this.results.innerHTML += `
      <div class="col-md-4 fulltext__result">
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
