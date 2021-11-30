const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { Conflict } = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const register = async(req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'http' })
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email: ${email} already exists`)
  }

  const verificationToken = v4()
  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Confirm your registration',
    html: `<a href="http://localhost:3000/api/auth/verify${verificationToken}">Click to confirm your email</a>`
  }

  await sendMail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    avatarURL
  })
}

module.exports = register
