import axios from 'axios';

export const axiosTemplate = axios.create({
  baseURL: 'http://172.16.30.26:8283/v1/api/',
});
