import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestInterceptor, RequestConfig } from './type'
import { loading, DEFAULT_LOADING } from '@/service/request/loading'

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptor
  loading?: boolean
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.loading = config.showLoading ?? DEFAULT_LOADING

    // 局部请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.loading) {
          loading.open()
        }

        console.log('全局请求成功拦截器')
        config.headers.token = '456'
        return config
      },
      (error) => {
        loading.close()
        console.log('全局请求失败拦截器')
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 全局响应拦截器
    this.instance.interceptors.response.use(
      function (response) {
        loading.close()
        console.log('全局响应成功拦截器')
        return response
      },
      function (error) {
        loading.close()
        console.log('全局响应失败拦截器')
        return Promise.reject(error)
      }
    )
  }

  request<T>(config: RequestConfig): Promise<T> {
    // 单个请求拦截器
    if (config?.interceptors?.requestInterceptor) {
      this.instance.interceptors.request.use(
        config.interceptors?.requestInterceptor,
        config.interceptors?.requestInterceptorCatch
      )
    }

    if (config.showLoading === false) {
      this.loading = config.showLoading
    }

    // 单个响应拦截器
    if (config?.interceptors?.responseInterceptor) {
      this.instance.interceptors.response.use(
        config.interceptors?.responseInterceptor,
        config.interceptors?.responseInterceptorCatch
      )
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.loading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((error) => {
          this.loading = DEFAULT_LOADING
          console.log(error)
          reject(error)
        })
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  put<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  delete<T>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default Request
