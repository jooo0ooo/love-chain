import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
    baseURL: `http://localhost:3139`,
    headers: {

    }
});