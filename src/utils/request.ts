import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { HttpRes } from '@/interfaces/index'
import store from '../store'

const request = axios.create({
  baseURL: '',
  timeout: 60 * 1000,
})

request.interceptors.request.use(
  (config) => {
    // 造数平台接入分组id
    // config.headers.token = ''
    config.data.projectId = store.getters.projectId
    // config.data.projectId = 56
    const loginInfo = localStorage.getItem('loginInfo')
    if (loginInfo && loginInfo.length) {
      const loginInfoJson = JSON.parse(loginInfo)
      config.headers.token = loginInfoJson.token
      localStorage.setItem('token', loginInfoJson.token)
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (res) => res,
  (err) => {
    const statusMap = {
      400: '参数错误',
      401: '未登录或授权信息过期，请重新登录',
      403: '禁止访问',
      404: '请求地址无效',
      500: '服务器错误',
      502: '服务器错误',
      504: '请求超时',
    }
    const status: number = err.response.status
    if (status === 401) {
      // 2001为session失效
      // 请求状态码401
      ElMessage.error({
        message: err.response.data.errmsg,
      })
    } else {
      ElMessage.error({
        message: statusMap[String(status)] || '未知错误',
      })
    }
    return Promise.reject(err)
  }
)

// 业务 框架错误处理
request.interceptors.response.use(
  (res: AxiosResponse) => {
    const resData = res.data
    const status = resData.errno
    if (status) {
      const statusArray = [2120, 9001, 2001, 2000, 4152, 30001]
      if (statusArray.indexOf(status) > -1) {
        ElMessage.error({
          message: '登录已过期',
        })
      } else {
        ElMessage.error({
          message: resData.errmsg,
        })
      }
      return Promise.reject(resData)
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

async function http<T>(options: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<HttpRes<T>> = await request(options)
  return res.data.data
}
export default http
