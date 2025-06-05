import axios from 'axios'

    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

       // Response interceptor
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle errors globally, e.g., redirect to login on 401
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
      }
    );

    export default api;