// axios 调用
import axios from "axios"

export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}