import { BASE_URL, TIMEOUT } from '@/service/request/config'
import Request from '@/service/request'

const service = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('局部请求成功拦截器')
      config.headers.a = '123'
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('局部请求失败拦截器')
      return error
    },
    responseInterceptor: (res) => {
      console.log('局部响应成功拦截器')
      return res
    },
    responseInterceptorCatch: (error) => {
      console.log('局部响应失败拦截器')
      return error
    }
  }
})

export { service }
