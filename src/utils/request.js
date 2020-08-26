import axios from "axios";
import { Message } from "element-ui";
axios.defaults.withCredentials = true;

//对请求进行封装
axios.interceptors.response.use(
  success => {
    if (
      success.status &&
      success.status === 200 &&
      success.data.status === 500
    ) {
      Message.error({ message: success.data.msg });
      return;
    }
    if (success.data.msg) {
      Message.success({ message: success.data.msg });
    }
    return success.data;
  },
  error => {
    if (error.response.status === 504 || error.response.status === 404) {
      Message.error({ message: "服务器被吃了⊙﹏⊙∥" });
    } else if (error.response.status === 403) {
      Message.error({ message: "权限不足,请联系管理员!" });
    } else if (error.response.status === 401) {
      Message.error({ message: "尚未登陆，请登录" });
    } else {
      if (error.response.data.msg) {
        Message.error({ message: error.response.data.msg });
      } else {
        Message.error({ message: "未知错误!" });
      }
    }
  }
);
//对方法进行封装
let base = " ";
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json",
      token: window.sessionStorage.getItem("user")
    }
  });
};
export const putRequest = (url, params) => {
  return axios({
    method: "put",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const deleteRequest = (url) => {
  return axios({
    method: "delete",
    url: `${base}${url}`
  });
};
export const getRequest = (url) => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("user")) {
      config.headers.Authorization = localStorage.getItem("user");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
