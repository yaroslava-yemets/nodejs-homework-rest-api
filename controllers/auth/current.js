const { User } = require('../../models')

const current = async(req, res) => {
  const { _id } = req.user
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
