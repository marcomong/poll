module.exports = {
  app: {
    port: process.env.PORT || 8082
  },
  db: {
    server: process.env.DB_SERVER || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'auth'
  },
  jwt: {
    token_secret: process.env.JWT_TOKEN_SECRET || 'shhhhhh',
    refresh_token: process.env.JWT_REFRESH_SECRET || 'shhhhhrefresh'
  }
}