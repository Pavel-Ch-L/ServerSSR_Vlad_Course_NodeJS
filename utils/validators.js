const {body} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите корректный Email').custom(async(value, {req}) => {
    try {
      const user = await User.findOne({email: value})
      if (user) {
        return Promise.reject('Такой Email уже занят')
      }
    } catch (error) {
      console.log(error);
    }
  }).normalizeEmail(),

  body('password', 'Пароль должен быть от 2 - 6 символов').isLength({min: 2, max: 12}).isAlphanumeric().trim(),

  body('confirm').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Пароли должны совпадать')
    }
    return true
  }).trim(),

  body('name').isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа').trim()
]

exports.loginValidators = [
  body('email').isEmail().withMessage('Введите корректный Email').custom(async(value, {req}) => {
    try {
      const user = await User.findOne({email: value})
      if (!user) {
        return Promise.reject('Такой Email не существует')
      }
    } catch (error) {
      console.log(error);
    }
  }),

  body('password', 'Пароль должен быть от 2 - 6 символов').isLength({min: 2, max: 12}).isAlphanumeric().trim().custom(async(value, {req}) => {
    try {
      const user = await User.findOne({email: req.body.email})
      if (user && !await bcrypt.compare(value, user.password)) {
        return Promise.reject('Пароль не совпадает')
      }
    } catch (error) {
      console.log(error);
    }
  })
]

exports.courseValidators = [
  body('title').isLength({min:3}).withMessage('Минимальная длинна названия 3 символа').trim(),
  body('price').isNumeric().withMessage('Введите корректную цену'),
  body('img', 'Введите корректный URL картинки').isURL()
]