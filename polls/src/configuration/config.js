module.exports = {
  db: {
    server: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'polls'
  },
  app: {
    port: process.env.APP_PORT || 8083 
  }
}