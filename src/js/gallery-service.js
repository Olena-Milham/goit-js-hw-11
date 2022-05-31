// api working logic

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    //   our object property (page) and its value(1);
    this.page = 1;
    this.totalHits = null;
  }
  // methods
  fetchPhotos() {
    //   let's look at this.searchQuery value
    // console.log('before http request', this);
    const BASE_URL = 'https://pixabay.com';
    const API_KEY = '27724352-dbb0b885dfbe6c3089a83b168';
    const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&per_page=40&page=${this.page}`;

    //   return promise to draw in outer code
    return fetch(url)
      .then(response => {
        // if (!response.ok) {
        //   throw new Error(response.status);
        // }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.incrementPage(); // if the http request is successful (we recieved fetch result) and we recieved data, we can increase the page load => that's why we're doing it here, in this then
        // console.log('after http request', this);
        // console.log(data.hits);
        // console.log(hits);

        // const totalHit = data.totalHits;

        return data.hits;
      });
    // .catch(error => {
    //   // Error handling
    //   Notify.failure('Oops, there is no picture with that name');
    // });
  }

  // page methods
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  // methods to write smth down or recieve from outer code
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  // onCatchError(error) {
  //   Notify.failure('Oops, there is no country with that name');
  // }
}
