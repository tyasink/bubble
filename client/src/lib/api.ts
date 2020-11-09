import Axios, { AxiosRequestConfig } from "axios";
import authToken from "./authToken";

const axios = Axios.create({
  timeout: process.env.timeout || 30000,
  validateStatus: status => true,
});

axios.interceptors.request.use(
  async config => {

    config.headers.post["Content-Type"] = "application/json";
    config.headers.put["Content-Type"] = "application/json";

    const token = await authToken.get();
    if (token) {
      config.headers.common["Authorization"] = "Bearer " + token;
    }

    return config;
  });

const loading = (f, isLoading) => {
  if (!f) return;

  if (f.setState) {
    f.setState({ isLoading });
  } else {
    f?.(isLoading);
  }
}

async function myFetch(setIsLoading, config?: AxiosRequestConfig): Promise<Response> {
  return new Promise(async (resolve, reject) => {

    try {
      loading(setIsLoading, true);

      const response = await axios.request(config);

      // Unauthorized
      if (response.status === 401) {
        authToken.clear();
        return;
      }

      // Forbidden
      if (response.status === 403) {
        authToken.clear();
        return;
      }

      loading(setIsLoading, false);

      // Internal Server Error
      if (response.status === 500) {
        console.log(response);
        alert("Internal server error");
        return;
      }

      if (response.status !== 200 && response.status !== 204) {
        reject(response);
        return;
      }

      resolve(response.data);

    } catch (error) {

      console.log(error);
      console.log(JSON.stringify(error));

      if (error.code == "ECONNABORTED") {
        alert("Server is busy, please try again later");
      } else {
        alert("No internet connection");
      }

      loading(setIsLoading, false);
      reject(error);
    }
  });
}

export default function api(setIsLoading, config?: AxiosRequestConfig) {

  const baseUrl = process.env.baseUrl || "http://api-staging.joinbubble.co.uk/";

  return {
    get: (url: string) => {
      return myFetch(setIsLoading, { ...config, url: baseUrl + url, method: "GET" });
    },

    post: (url: string, data: object) => {
      return myFetch(setIsLoading, { ...config, url: baseUrl + url, method: "POST", data });
    },

    put: (id: number, url: string, data: object) => {
      if (url.startsWith("odata")) {
        url += "(" + id + ")";
      } else {
        url += "/" + id;
      }
      return myFetch(setIsLoading, { ...config, url: baseUrl + url, method: "PUT", data });
    },

    patch: (id: number, url: string, data: object) => {
      if (url.startsWith("odata")) {
        url += "(" + id + ")";
      } else {
        url += "/" + id;
      }
      return myFetch(setIsLoading, { ...config, url: baseUrl + url, method: "PATCH", data });
    },

    delete: (id: number, url: string) => {
      if (id != null) {
        url += "/" + id;
      }
      return myFetch(setIsLoading, { ...config, url: baseUrl + url, method: "DELETE" });
    },
  };
}
