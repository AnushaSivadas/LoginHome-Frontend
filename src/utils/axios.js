import axios from 'axios';
import { BASE_URL } from './constants';


const instance = axios.create({
    baseURL: BASE_URL,
 
  });

  instance.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      const token = JSON.parse(localStorage.getItem("profile")).token;
      req.headers.Authorization = `Bearer ${token}`;
    }
  
    return req;
  });

 export default instance 