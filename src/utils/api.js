import axios from 'axios';

// Create a default Axios instance
const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Adjust based on your backend
});

// Create an Axios instance with Authorization header
const myPrivateAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Adjust based on your backend
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export { myAxios, myPrivateAxios };
