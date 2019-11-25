module.exports = {
  app: {
    url: process.env.WEB_URL || 'http://localhost',
    env: process.env.NODE_ENV || 'dev'
  },
  axios: {
    baseInstance: process.env.AXIOS_INSTANCE || 'http://localhost:8081/',
    authInstance: process.env.AXIOS_INSTANCE_AUTH || 'http://localhost:8082/',
    pollInstance: process.env.AXIOS_INSTANCE_POLL || 'http://localhost:8083/'
  }
}
