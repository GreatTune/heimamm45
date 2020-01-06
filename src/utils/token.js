// 定义key
const key = "heimammtoken"

// 保存token 
export function saveToken(token) {
  // 保存数据 token的值  是外部传入的
  window.localStorage.setItem(key,token)
}
// 获取token 
export function getToken() {
  // 读取并返回 保存的token值
  return window.localStorage.getItem(key)
}
// 删除token
export function removeToken() {
  // 删除token
  window.localStorage.removeItem(key)
}