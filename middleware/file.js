const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images') // Путь для файлов
  },
  filename(req, file, cb) {
    cb(null, path.basename(file.originalname, `${path.extname(file.originalname)}`) + '-' + new Date().getTime() + path.extname(file.originalname)) // Имя файла
  }
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'] // Принемаемые типы файлов

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage,
  fileFilter
})