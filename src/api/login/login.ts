import { service } from '../../service/index'

// 登录接口
export const accountLoginRequest = () => {
  return service.request({
    url: '/login',
    method: 'POST'
  })
}
