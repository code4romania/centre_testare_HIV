const HOST_URL = process.env.REACT_APP_DJANGO_SITE_URL;
const API_PORT = process.env.REACT_APP_DJANGO_PORT ? `:${process.env.REACT_APP_DJANGO_PORT}` : '';
const API = process.env.REACT_APP_DJANGO_API_ENDPOINT;

// @TODO update API endpoints
export default {
  BUILDINGS_URL: `${HOST_URL}${API_PORT}/${API}/centers`,
  PAGES_URL: `${HOST_URL}${API_PORT}/${API}/pages`,
  POSTS_URL: `${HOST_URL}${API_PORT}/${API}/posts`,
  MAP_API_KEY: process.env.REACT_APP_HERE_MAPS_API_KEY,
  CAPTCHA_API_KEY: process.env.REACT_APP_CAPTCHA_API_KEY,
};
