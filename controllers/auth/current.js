const { Unauthorized } = require('http-errors')

const { User } = require('../../models')

const current = async(req, res) => {
  const { _id, token } = req.user
  console.log(_id)
  console.log(token)
  if (!token) {
    throw new Unauthorized('You are not authorized')
  }
  const { email, subscription } = await User.findById(_id)
  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription
    }
  })
}

module.exports = current
