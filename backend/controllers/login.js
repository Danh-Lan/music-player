const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  if (!username || !password) {
    return response.status(400).json({
      error: 'username and password required'
    })
  }

  if (username != process.env.ADMIN_USERNAME || password != process.env.ADMIN_PASSWORD) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: username,
    isAdmin: true,
  }

  const token = jwt.sign(userForToken, process.env.ADMIN_SECRET, {
    expiresIn: 60 * 60
  })

  response
    .status(200)
    .send({ token })
})

module.exports = loginRouter