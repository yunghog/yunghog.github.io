import axios from 'axios';
import { ApiConfig } from './';
const DEFAULT_TIMEOUT = 30 * 1000;

const EmailJsApi = axios.create({
  baseURL: ApiConfig.emailJs.baseUrl,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
EmailJsApi.interceptors.response.use(
  (response) => {
    return { ...response.data, status: response.status };
  },
  (error) => Promise.reject(error),
);
export default EmailJsApi;
