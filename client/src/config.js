const HOST_URL = process.env.REACT_APP_DJANGO_SITE_URL;
const API_PORT = process.env.REACT_APP_DJANGO_PORT ? `:${process.env.REACT_APP_DJANGO_PORT}` : '';
const API = process.env.REACT_APP_DJANGO_API_ENDPOINT;

export default {
  CENTER_URL: `${HOST_URL}${API_PORT}/${API}/center/`,
  CONTACT_URL: `${HOST_URL}${API_PORT}/${API}/contact/`,
  PAGE_URL: `${HOST_URL}${API_PORT}/${API}/page/`,
  POST_URL: `${HOST_URL}${API_PORT}/${API}/post/`,
  STATISTICS_URL: `${HOST_URL}${API_PORT}/${API}/statistics/`,
  TEST_TYPE: `${HOST_URL}${API_PORT}/${API}/test_type/`,
  MAP_API_KEY: process.env.REACT_APP_HERE_MAPS_API_KEY,
  CAPTCHA_API_KEY: process.env.REACT_APP_CAPTCHA_API_KEY,
};
