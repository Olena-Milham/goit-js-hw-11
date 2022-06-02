import '../css/styles.css';
import refs from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import api from './api-photos';
import galleryTpl from '../templates/gallery.hbs';

// vars
const lightbox = new SimpleLightbox('.gallery a');
let hitsCounter = 0;
var debounce = require('lodash.debounce');

// functions

function onSearch(e) {
  e.preventDefault();
  clearHitsGallery();
  // refs.loadMoreBtn.classList.add('invisible');
  hitsCounter = 0;
  api.settings.page = 1;

  api.settings.q = e.currentTarget.elements.searchQuery.value.trim();
  if (api.settings.q === '') {
    Notify.warning('The search field is empty.');
    return;
  }
  api
    .getPhotos()
    .then(response => {
      if (response.total === 0) {
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
      cardsRender(response.hits);
      Notify.info(`Hooray! We found ${response.total} images.`);
      // refs.loadMoreBtn.classList.remove('invisible');
      hitsCounter += response.hits.length;
    })
    .catch(onError);
}

function onLoadMore() {
  api.settings.page += 1;
  api
    .getPhotos()
    .then(response => {
      console.log('counter ', hitsCounter);
      console.log(response.totalHits);
      if (response.totalHits <= hitsCounter) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
        // refs.loadMoreBtn.classList.add('invisible');
        return;
      }
      hitsCounter += response.hits.length;
      cardsRender(response.hits, true);
    })
    .catch(onError);
}

// clears html
function clearHitsGallery() {
  refs.gallery.innerHTML = '';
}

function cardsRender(data, scroll = false) {
  const markup = galleryTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  if (scroll) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
function onError() {
  Notify.warning('Opps smth went wrong');
}

function everScroll() {
  if (document.documentElement.getBoundingClientRect().bottom < window.innerHeight + 20) {
    onLoadMore();
  }
}

// main
refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

window.addEventListener('scroll', debounce(everScroll, 200));
