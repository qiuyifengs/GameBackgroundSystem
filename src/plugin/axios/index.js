import store from '@/store'
import axios from 'axios'
import message from 'ant-design-vue/es/message'
import util from '@/libs/util'
import router from '@/router'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }

  message.error(error.message)
}

// 创建一个 axios 实例 process.env.VUE_APP_API
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30 * 1000, // 请求超时时间
  withCredentials: true // 允许携带cookie
})

service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // console.log('token ', token)
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    // config.headers['Authorizationn'] = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    message.error(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    const { Code } = dataAxios
    if (Code === 302) {
0      // 删除cookie
      util.cookies.remove('token')
      util.cookies.remove('uuid')
      // 清空 vuex 用户信息
      store.dispatch('d2admin/user/set', {}, { root: true })
      // 跳转路由
      router.push({
        name: 'login'
      })
    }
    // if (Code === undefined) {
    //   return dataAxios.data
    // } else if (Code === 302) {
    //   // switch (Code) {
    //   //   case 0:
    //   //     return dataAxios.data
    //   //   // case 302:
    //   //   //   errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
    //   //   //   break
    //   //   // default:
    //   //   //   // 不是正确的 code
    //   //   //   errorCreate(`${dataAxios.msg}: ${response.config.url}`)
    //   //   //   break
    //   // }
    // }
    return dataAxios
  },
  error => {
    console.log('error'+ error)
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500:
          error.message = `服务器内部错误, 请求地址: ${error.response.config.url}`;
          // router.replace('/500')
          break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
