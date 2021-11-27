const multer = require('multer')
const path = require('path')
const { BadRequest } = require('http-errors')

const tempDir = path.join(__dirname, '../', 'tmp')
console.log(tempDir)

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/svg+xml' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/tiff'
  ) {
    cb(null, true)
  } else {
    cb(new BadRequest('You can upload only image type'), false)
  }
}

const upload = multer({
  storage: uploadConfig,
  fileFilter
})

module.exports = upload
