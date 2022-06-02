const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27724352-dbb0b885dfbe6c3089a83b168';

import axios from 'axios';

const settings = {
  q: '',
  image_type: 'photo',
  orientation: 'horisontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

const instance = axios.create({
  baseURL: BASE_URL,
});

async function getPhotos() {
  try {
    const response = await instance.get('', {
      params: { key: API_KEY, ...settings },
    });
    return await response.data;
  } catch (error) {
    console.log('catched', error);
  }
}
export default { settings, getPhotos };
