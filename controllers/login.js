const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findOne({ username: body.username })
  
    let passwordCorrect = false
    if (user !== null) {
      passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
    }
  
    console.log(passwordCorrect)
    if (!passwordCorrect) return response.status(401).json({error: 'invalid username or password'})
   
    const userToken = {
      username: user.username,
      id: user._id
    }
  
    const token = jwt.sign(userToken, config.VALIDATION)

    // console.log(token)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch(exeption) {
    next(exeption)
  }
})

module.exports = loginRouter