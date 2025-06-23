import axios from "axios";
import { getValueFromLocalStorageKey } from "../utils/helper";
import apiDetails from "./apiDetails";
import { UNSAFE_createBrowserHistory } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { errorNotify } from "../service/Messagebar";

const history = UNSAFE_createBrowserHistory();

const instance = axios.create({
    baseURL: apiDetails.baseUrl,
    withCredentials: false,
});

instance.interceptors.request.use(
    async (config) => {
        const token = JSON.stringify(getValueFromLocalStorageKey("userDetails", "token"));

        if (token != null && token !== undefined) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
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
                const { data, status } = error.response;

                if (status === 401 && data?.error === "Token Expired") {
                    localStorage.clear();
                    const logout = useAuthStore.getState().clearUser;
                    if (logout) logout();
                    errorNotify("Session expired. Please log in again.");

                    setTimeout(() => {
                        history.push("/login");
                    }, 1000);
                }

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

export const authorizedGet = (url, config = {}) => {
    return instance.get(url, config);
};

export const authorizedPost = (url, data, config = {}) => {
    return instance.post(url, data, config);
};

export const authorizedPut = (url, data, config = {}) => {
    return instance.put(url, data, config);
};

export const authorizedDel = (url, config = {}) => {
    return instance.delete(url, config);
};

export default instance;
