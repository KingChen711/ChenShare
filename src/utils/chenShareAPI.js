/* eslint-disable camelcase */
import axios from 'axios';
import { URL_API } from './constants';

export const chenShareApi = axios.create({
  baseURL: `${URL_API}/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('chen-share-token')}`,
  },
});
