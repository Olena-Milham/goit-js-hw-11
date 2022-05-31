//  api working logic

import axios from 'axios';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    //   our object property (page) and its value(1);
    this.page = 1;
    this.totalHits = 0;
  }
  // methods
  async fetchPhotos() {
    const BASE_URL = 'https://pixabay.com';
    const API_KEY = '27724352-dbb0b885dfbe6c3089a83b168';
    const url = `${BASE_URL}/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&per_page=40&page=${this.page}`;
    console.log(this);
    //   return promise to draw in outer code
    const response = await axios(url);
    if (!response.data.total) {
      throw new Error('error');
    }
    console.log(response);
    this.incrementPage();
    const { hits, totalHits } = response.data;
    this.setTotalHits();
    this.lastTotalHits();

    console.log(response.data);

    return { hits, totalHits };
  }

  // page methods
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  setTotalHits(hits) {
    this.totalHits = hits;
  }
  lastTotalHits() {
    this.totalHits -= 40;
  }
  // methods to write smth down or recieve from outer code
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
