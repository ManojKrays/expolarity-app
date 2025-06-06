import axios from "axios";
import apiDetails from "./apiDetails";

const instance = axios.create({
    baseURL: apiDetails.baseUrl,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            if (error.response) {
                console.log("Error", error.response);
                const { data } = error.response;
                return Promise.reject(data);
            } else {
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error);
        } finally {
        }
    },
);

export const get = (url, config = {}) => {
    return instance.get(url, config);
};

export const post = (url, data, config = {}) => {
    return instance.post(url, data, config);
};

export const put = (url, data, config = {}) => {
    return instance.put(url, data, config);
};

export const del = (url, config = {}) => {
    return instance.delete(url, config);
};

export default instance;
