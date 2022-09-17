import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://fakestoreapi.com";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin" : "*",
  },
  timeout: 10000000,
  withCredentials: false,
});

request.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // const token = localStorage.getItem("jwtToken");
    // config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
