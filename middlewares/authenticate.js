const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async(req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }

    try {
      const { _id: id } = jwt.verify(token, SECRET_KEY)
      console.log(id)
      const user = await User.findById(id)
      if (!user || !user.token) {
        throw new Unauthorized('Not authorized')
      }
      req.user = user
      console.log(user)
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
