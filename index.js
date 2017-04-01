const express = require('express')
const server = express()
const alexa = require('./alexa')

alexa.express({
  expressApp: server,
})

server.listen(process.env.PORT)
server.get('/', (request, response) => response.end('It is alive!'))
server.use('/static', express.static('views'))

console.log(`Listening income requests on port ${process.env.PORT}`)
