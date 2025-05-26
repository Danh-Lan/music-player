const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const tracksRouter = require('./controllers/tracks')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const path = require('path')

const app = express()

logger.info('Connecting to MongoDB...')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })
  
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/tracks', tracksRouter)
  
app.use(express.static('client'))
app.get(/(.*)/, (req, res) => res.sendFile(path.resolve('client', 'index.html')));

app.use(middleware.errorHandler)

module.exports = app