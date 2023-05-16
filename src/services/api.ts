import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

import { logout } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://pixpayview.mateusneres.dev',
/*     headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`,
    } */
  });

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response && error.response.status === 401) {
      if(typeof window !== 'undefined') {
        logout();
      } else {
        return Promise.reject(new AuthTokenError());
      }
    }
    return Promise.reject(error);
  })

  return api;
}