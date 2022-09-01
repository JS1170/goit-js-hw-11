import './common.css';
// import createMarkup from '.create-markup.js';
import { components } from './create-markup';
import PhotoApiService from './api-service';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const photoApiService = new PhotoApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  photoApiService.query = e.currentTarget.elements.searchQuery.value;
  photoApiService.resetPage();
  photoApiService.fetchArticles().then(addCompontents => {
    clearDiv();
    components(addCompontents);
    if (addCompontents.length === 0) {
      alert(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
  });
}

function onLoadMore() {
  photoApiService.fetchArticles().then(hits => {
    components(hits);
    if (photoApiService.per_page * photoApiService.page > hits) {
      alert("We're sorry, but you've reached the end of search results.");
    }
  });
}

function clearDiv() {
  refs.div.innerHTML = '';
}
