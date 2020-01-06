// axios 调用
import axios from "axios"
// 导入token工具函数
import {getToken} from '../utils/token'
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
    method: "post", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    data// 参数
  })
}
// 定义获取用户方法  并暴露出去
export function info(){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/info",
    method: "get", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    // 参数
    headers: {
      // token: window.localStorage.getItem("heimammtoken")
      // 调用抽取的 token函数来获取token
      token: getToken()
    }
  })
}
// 定义用户退出  并暴露出去
export function logout(){
  return axios({
    url: process.env.VUE_APP_BASEURL + "/logout",
    method: "get", // 请求类型
    withCredentials: true, // 跨域 , 是否携带
    headers: {
      // 调用抽取的 token函数来获取token
      token: getToken()
    }
  })
}