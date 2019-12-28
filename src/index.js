const searchBox = document.querySelector('.search__box');
const searchInput = document.querySelector('.search__input');

searchInput.addEventListener('focus', e => {
  console.log(e);
  searchBox.classList.add('focus');
});
searchInput.addEventListener('blur', e => {
  console.log(e);
  searchBox.classList.remove('focus');
});
