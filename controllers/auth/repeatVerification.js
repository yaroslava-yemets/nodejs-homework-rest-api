const { BadRequest, NotFound } = require('http-errors')
const { sendMail } = require('../../helpers')
const { User } = require('../../models')

const repeatVerification = async(req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('missing required field email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound(`User with email: ${email} is not found`)
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'Confirm your registration',
    html: `<a href="http://localhost:3000/api/auth/verify${user.verificationToken}">Click to confirm your email</a>`
  }

  await sendMail(mail)

  res.json({
    message: 'Verification email sent'
  })
}

module.exports = repeatVerification
