const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = process.env
sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async(data) => {
  const email = { ...data, from: 'yaroslava1058@gmail.com' }
  await sgMail.send(email)
  console.log('we sent the letter')
  return true
}

module.exports = sendMail
