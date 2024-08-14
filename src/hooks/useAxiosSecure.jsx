import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    // Request interceptor to add JWT token
    axiosSecure.interceptors.request.use(
        (config) => {
            // Get the token from localStorage
            const token = localStorage.getItem('auth-token');
            if (token) {
                // If token exists, add it to the request headers
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            // Handle request errors
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;