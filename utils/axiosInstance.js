import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: "http://adminhitl-001-site21.ctempurl.com",
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    if (config.url == "/api/v1/user/login") {
    config.headers.password = config.data.password;
    }
    else {
       const bearerToken = localStorage.getItem("accessToken")
        config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.config.url == "/api/v1/user/login") {
    const accessToken = response.data.data.accessToken
    console.log(accessToken)
    localStorage.setItem("accessToken", accessToken)
    }
    else {
      
   }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
