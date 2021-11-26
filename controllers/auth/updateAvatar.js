const fs = require('fs/promises')
const path = require('path')
const { NotFound } = require('http-errors')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarDir = path.join(__dirname, '../', '../', 'public/avatars')

const updateAvatar = async(req, res) => {
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file
  const avatarName = `${_id}_${originalname}`

  try {
    const resultUpload = path.join(avatarDir, avatarName)
    Jimp.read(tempUpload, (err, name) => {
      if (err) throw err
      name.resize(250, 250).write(resultUpload)
    })
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('/avatars', avatarName)
    const result = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    if (!result) {
      throw new NotFound(`Contact with id: ${_id} is not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateAvatar
