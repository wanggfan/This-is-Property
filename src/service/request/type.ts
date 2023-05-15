import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface RequestInterceptor {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (
    res: AxiosResponse<any>
  ) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  responseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptor
  showLoading?: boolean
}
