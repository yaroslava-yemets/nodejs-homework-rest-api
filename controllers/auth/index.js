const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const repeatVerification = require('./repeatVerification')

module.exports = {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  repeatVerification
}
