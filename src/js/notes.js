// const refs = {
//   form: document.querySelector('#search-form'),
//   searchBtn: document.querySelector('.search-form__btn'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const DEBOUNCE_DELAY = 300;

// refs.form.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   e.preventDefault();
// }

// function appendGalleryCardsMarkup() {
//   refs.gallery.insertAdjacentHTML('beforeend', galleryCards());
// }

// function clearMarkup() {
//   refs.gallery.innerHTML = '';
// }

// const BASE_URL = 'https://pixabay.com';
// const API_KEY = '27724352-dbb0b885dfbe6c3089a83b168';
// const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&per_page=40&page=${this.page}`;

// const galleryEl = document.querySelector('.gallery');
// const markup = hits
//   .map(
//     item => `<div class='photo-card'>
//     <img
//       src='${webformatURL}'
//       data-source='${largeImageURL}'
//       alt='${tag}'
//       loading='lazy'
//     />
//     <div class='info'>
//       <p class='info-item'>
//         <b>Likes:</b>${likes}
//       </p>
//       <p class='info-item'>
//         <b>Views:</b>${views}
//       </p>
//       <p class='info-item'>
//         <b>Comments:</b>${comments}
//       </p>
//       <p class='info-item'>
//         <b>Downloads:</b>${downloads}
//       </p>
//     </div>
//   </div>`
//   )
//   .join('');

// galleryEl.innerHTML = markup;

// galleryEl.insertAdjacentHTML('afterbegin', markup);
