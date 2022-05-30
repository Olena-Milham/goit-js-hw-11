import GalleryApiService from './js/gallery-service';
// to draw take templates
// import galleryCardsTpl from './templates/gallery.hbs';
import imageHits from './js/hits';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './js/load-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.search-form__btn'),
  gallery: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('.load-more'),
};
// to get {} with methods and properties make a new copy of the class
const galleryApiService = new GalleryApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

console.log(loadMoreBtn);
loadMoreBtn.show();
loadMoreBtn.disable();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadHits);

function onSearch(e) {
  e.preventDefault();
  // set a new value to this.searchQuery via set method
  galleryApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (galleryApiService.query === '') {
    // clearHitsGallery();
    return Notify.failure('The search field is empty.');
  }

  loadMoreBtn.show();
  //starts new search from page 1
  galleryApiService.resetPage();
  clearHitsGallery();
  loadHits();
}

function loadHits() {
  loadMoreBtn.disable();
  galleryApiService.fetchPhotos().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}
// function onLoadMore() {
//   // galleryApiService.fetchPhotos().then(appendHitsMarkup);
//   loadHits();
// }

// adds gallery cards
const appendHitsMarkup = hits => {
  const markup = hits.map(image => imageHits(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
};

// clears html
function clearHitsGallery() {
  refs.gallery.innerHTML = '';
}
