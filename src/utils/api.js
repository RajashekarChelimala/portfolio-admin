import axios from 'axios';

// Create a default Axios instance
const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Create an Axios instance with Authorization header
const myPrivateAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add a request interceptor
myPrivateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { myAxios, myPrivateAxios };
