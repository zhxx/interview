// import Vue from 'vue'
import axios from 'axios'
// import Cookie from 'js-cookie'
import { Message } from 'element-ui'
// import { t } from 'element-ui/src/locale'
const $ajax = axios.create({
  baseURL: '',
  timeout: 120000,
  paramsSerializer: function(params) {
    console.log(JSON.stringify(params))
    var result = []
    var _params = Object.assign({}, params)
    if (_params) {
      Object.keys(_params).forEach(key => {
        if (_params[key] != null) {
          if (typeof _params[key] == 'string') {
            try {
              _params[key] = encodeURIComponent(decodeURIComponent(_params[key]))
            } catch (e) {
              _params[key] = encodeURIComponent(_params[key])
            }
          }
          result.push(`${key}=${_params[key]}`)
        }
      })
    }
    return result.join('&')
  }
})

function objectToParams(obj) {
  if (obj) {
    let paramStr = ''
    Object.keys(obj).forEach((item) => {
      paramStr += '&' + item + '=' + obj[item]
    })
    return '?' + paramStr.slice(1)
  } else {
    return ''
  }
}

// 拦截请求
$ajax.interceptors.request.use(config => {

  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  return config
}, error => {
  Promise.reject(error)
})
// 统一错误处理
$ajax.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.data)
    }
  },
  error => {
    if (!error.message) {
      return Promise.reject(error)
    }

    if (error.message == 'Network Error') {
      error.message = t('common.message.error.network')
      return Promise.reject(error)
    }
    // 通用错误提示
    if (400 === error.response.status || 403 === error.response.status || 500 == error.response.status) {

      // 如果是表单提交错误，就不进行全局消息提示，在表单行内提示
      if (error.response.config.handle === true && error.response.status === 400) {
        if (error.response.data && error.response.data.errors) {
          if (error.response.data.errors.length) {
            error.response.data.errors = error.response.data.errors.map(item => {
              if (item.key && item.code) {
                item.code = getErrorMsg(item.code)
                return item
              }
              return item
            })
          }
          return Promise.reject(error)
        }
      }
      let msg = getErrorMsg(error)
      Message.error(msg)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  })

export default $ajax
