import axios, { AxiosInstance } from 'axios';

axios.defaults.withCredentials = true;

export const myAxios: AxiosInstance = axios.create({
    baseURL: `http://localhost:3139`,
    headers: {
        
    }
});