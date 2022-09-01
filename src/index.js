import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { components } from './create-markup';
import PhotoApiService from './api-service';
import './common.css';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const photoApiService = new PhotoApiService();
const lightbox = new SimpleLightbox('.gallery a');

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

isHidden();
async function onSearch(e) {
  e.preventDefault();
  try {
    photoApiService.query = e.currentTarget.elements.searchQuery.value;
    isHidden();
    photoApiService.resetPage();

    const result = await photoApiService.fetchArticles();
    console.log(result);
    console.log(result.data);
    console.log(result.data.hits);
    clearDiv();
    if (result.data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    components(result.data.hits);
    lightbox.refresh();
    Notify.success(`Hooray! We found ${result.data.totalHits} images.`);
    isShow();
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    photoApiService.incrementPage();
    const result = await photoApiService.fetchArticles();
    components(result.data.hits);
    lightbox.refresh();

    scrollPage();

    if (
      photoApiService.per_page * photoApiService.page >
      result.data.totalHits
    ) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      isHidden();
    }
  } catch (error) {
    console.log(error);
  }
}

function clearDiv() {
  refs.div.innerHTML = '';
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function isHidden() {
  refs.loadMoreBtn.style.display = 'none';
}

function isShow() {
  refs.loadMoreBtn.style.display = 'block';
}
