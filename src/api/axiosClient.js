import axios from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
  baseURL: 'https://bni-api.herokuapp.com/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};

  const accessToken = localStorage.getItem('Bearer');
  if (accessToken) {
    customHeaders.Authorization = accessToken;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response.status === 401){
      // localStorage.removeItem('Bearer');
    }
    if (error.response.status === 404) {
      //localStorage.removeItem('Bearer');
    }
   return error;
  }
);
export default axiosClient;
