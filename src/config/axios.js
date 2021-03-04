import axios from 'axios'

const HTTP = axios.create({
  //baseURL: process.env.VUE_APP_PROD_URL,
  baseURL: process.env.VUE_APP_DEV_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000/',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  }
})


// Intercept all responses
axios.interceptors.response.use(
  (response) => {
    console.log('%c ' + response.status + ' - ' + getUrl(response.config) + ':', 'color: #008000; font-weight: bold', response);
    return response;
  },

  (error) => {
    if (error.response) {

      console.log('%c ' + error.response.status + ' - ' + getUrl(error.response.config) + ':', 'color: #a71d5d; font-weight: bold', error.response);

      switch (error.response.status) {
        case 400:
          Vue.$toast.error('Bad request.');
          break;
        case 401:
          Vue.$toast.error('Unauthorized access.');
          break;
        case 403:
          Vue.$toast.error(error.response.data.message || 'Forbidden access.');
          break;
        case 404:
          Vue.$toast.error('Requested resource not found.');
          break;
        case 419:
          Vue.$toast.error('Session expired. Please login again.');
          break;
        case 429:
          Vue.$toast.warning('Too many requests. Try again later.');
          break;
        case 500:
          Vue.$toast.error('Internal server error.');
          break;
        case 503:
          Vue.$toast.error('App is down for maintenance.');
          break;
        default:
          Vue.$toast.error('Unknown error occurred.');
      }
    }

    return Promise.reject(error);
  }
);

let token = localStorage.getItem('token')
if(token) {
  axios.defaults.headers.common['access-token'] = token
}

export default HTTP