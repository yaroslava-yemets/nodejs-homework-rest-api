const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async(req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('You are not authorized')
    }
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('You are not authorized')
    }

    try {
      const { _id: id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user || !user.token) {
        throw new Unauthorized('You are not authorized')
      }
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
