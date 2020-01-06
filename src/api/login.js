// axios 调用
import axios from "axios"
// 定义登录方法 并暴露出去 
export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/login",
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}
// 获取短信的方法 , 并暴露出去
export function sendsms(data){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/sendsms",
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}
// 定义用户注册方法  并暴露出去
export function register(data){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/register",
    method: "get", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}
// 定义获取用户方法  并暴露出去
export function info(data){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/info",
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}
// 定义退出登录方法  并暴露出去
export function logout(data){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/logout",
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}