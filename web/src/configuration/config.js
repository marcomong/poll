module.exports = {
  app: {
    url: process.env.VUE_APP_WEB_URL || 'http://localhost',
    env: process.env.NODE_ENV || 'dev'
  },
  axios: {
    baseInstance: process.env.VUE_APP_AXIOS_INSTANCE || 'http://localhost:8081/',
    authInstance: process.env.VUE_APP_AXIOS_INSTANCE_AUTH || 'http://localhost:8082/',
    pollInstance: process.env.VUE_APP_AXIOS_INSTANCE_POLL || 'http://localhost:8083/'
  }
}
