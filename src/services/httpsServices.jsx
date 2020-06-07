import axios from "axios";
import { toast } from "react-toastify";
import logger from './logService';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = 'https://profily-backend.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:3001/api';
 
//to set the header for all request
axios.interceptors.response.use(null, error =>{
  const expectedError = error.response && 
  error.response.status >= 400 &&
  error.response.status< 500;
  //Handling unexpected error
  if(!expectedError){
    // Sentry.captureMessage('Logging the error', error );
    //   console.log('Logging the error', error );
    logger.log(error);
    toast.error("An unexpected error occured");
  }
  //handling expected error
  return Promise.reject(error);
});

// function setJwt (jwt) {
//   axios.defaults.headers.common['x-auth-token'] = jwt;
  
//   }

  export default {
    get:  axios.get,
    post:  axios.post,
    put:  axios.put,
    delete:  axios.delete,
    // setJwt
  };
