import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
const app = createApp(App)

app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')

import { service } from '@/service'

service
  .post({
    url: '/login',
    data: {
      name: 'coderwhy',
      password: '123456'
    },
    // showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单个请求成功拦截器')
        config.headers.c = '789'
        return config
      },
      requestInterceptorCatch: (error) => {
        console.log('单个请求失败拦截器')
        return error
      },
      responseInterceptor: (res) => {
        console.log('单个响应成功拦截器')
        console.log('======>', res)
        return res
      },
      responseInterceptorCatch: (error) => {
        console.log('单个响应失败拦截器')
        return error
      }
    }
  })
  .then((res) => {
    console.log('res===>', res)
  })
  .catch((error) => {
    console.log('error', error)
  })
