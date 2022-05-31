import GalleryApiService from './js/gallery-service';

import imageHits from './js/hits';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './js/load-btn';
// import GalleryTpl from './templates/gallery.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.search-form__btn'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};
// to get {} with methods and properties make a new copy of the class
const galleryApiService = new GalleryApiService();
console.log(galleryApiService);
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// console.log(loadMoreBtn);

const lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// =====

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadHits);

async function onSearch(e) {
  e.preventDefault();
  clearHitsGallery();
  galleryApiService.resetPage();

  galleryApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (galleryApiService.query === '') {
    clearHitsGallery();
    return Notify.warning('The search field is empty.');
  }

  try {
    loadMoreBtn.show();
    loadHits();
    lightbox.refresh();
    galleryApiService.setTotalHits(result.totalHits);
    Notify.success(`Hooray! We found ${galleryApiService.totalHits} images.`);
    onLastPhotos();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function loadHits() {
  loadMoreBtn.disable();
  const result = await galleryApiService.fetchPhotos();
  appendHitsMarkup(result);
  loadMoreBtn.enable();

  galleryApiService.lastTotalHits();
  lightbox.refresh();

  onLastPhotos();
}

// adds gallery cards

async function appendHitsMarkup() {
  const hits = await galleryApiService.fetchPhotos();
  const markup = hits.map(image => imageHits(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

// clears html
function clearHitsGallery() {
  refs.gallery.innerHTML = '';
}
// totalHits
function onLastPhotos() {
  if (galleryApiService.totalHits <= 40) {
    loadMoreBtn.hide();
    return Notify.info(
      "We're sorry, but you've reached the end of search results"
    );
  }
}
