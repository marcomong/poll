import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
const config = require('../configuration/config')

export const instance = axios.create({
  baseURL: config.axios.baseInstance
})

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = getAccessToken()
  return config
})

export const authInstance = axios.create({
  baseURL: config.axios.authInstance
})

authInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = getAccessToken()
  return config
})

export const pollInstance = axios.create({
  baseURL: config.axios.pollInstance
})

pollInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = getAccessToken()
  return config
})

const refreshAuthLogic = failedRequest => authInstance.post('/auth/grantNewAccessToken', getRefreshTokenInfo())
  .then(tokenRefresh => {
    const newToken = tokenRefresh.data.token
    localStorage.setItem('token', newToken)

    return Promise.resolve()
  })

function getRefreshTokenInfo () {
  return {
    _id: localStorage.getItem('userId'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

function getAccessToken () {
  let token = localStorage.getItem('token')
  return token
}

createAuthRefreshInterceptor(instance, refreshAuthLogic)
createAuthRefreshInterceptor(authInstance, refreshAuthLogic)
createAuthRefreshInterceptor(pollInstance, refreshAuthLogic)
