import axios from "axios";
import { Message } from "element-ui";
import router from "../router";

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
      router.replace("/");
    } else {
      if (error.response.data.msg) {
        Message.error({ message: error.response.data.msg });
      } else {
        Message.error({ message: "未知错误!" });
      }
    }
    return;
  }
);
//对方法进行封装
let base = "/dbznyt";
export const postKeyValueRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let i in data) {
          ret +=
            encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params
  });
};
export const putRequest = (url, params) => {
  return axios({
    method: "put",
    url: `${base}${url}`,
    data: params
  });
};
export const deleteRequest = (url, params) => {
  return axios({
    method: "delete",
    url: `${base}${url}`,
    data: params
  });
};
export const getRequest = (url) => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};
export const uploadFile = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    //请求头信息
    headers: {'Content-Type': "multipart/form-data"},
    // //跨域请求时是否需要使用凭证
    // withCredentials: true,
    // // 返回数据类型
    // responseType: 'json', //default
  });
};