const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./configuration/config')
const log = require('./configuration/logger')
const routes = require('./routes/genericRoutes')
const Response = require('./models/Response')

require('./configuration/db')

const app = express()
app.use(cors())

app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '10mb'
}))
app.set('port', config.app.port)

app.use('/', routes)

app.use((_, res) => {
  return new Response(res, 404, 'End point not valid').send()
})

app.listen(app.get('port'), () => {
  log.info(`App started on port: ${config.app.port}`)
})
