const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const authenticateToken = (request, response, next) => {
  const token = request.headers['x-admin-token']

  if (!token) {
    return response.status(401).json({ error: 'Token missing' })
  }

  jwt.verify(token, process.env.ADMIN_SECRET, (error) => {
    if (error) {
      return response.status(403).json({ error: 'Token invalid' })
    }

    next()
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  authenticateToken,
  errorHandler,
}