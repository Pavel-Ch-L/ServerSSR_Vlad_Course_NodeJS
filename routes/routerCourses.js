const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth.js')
const {validationResult} = require('express-validator')
const {courseValidators} = require('../utils/validators')

function isOwner(course, req) {
  return course.userId.toString() === req.user._id.toString()
}

router.get('/', async(req, res) => {
 const courses = await Course.find()
 res.render('courses', {
  title: 'Курсы',
  isCourses: true,
  userId: req.user ? req.user._id.toString() : null,
  courses
 })
})

router.get('/:id', async(req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: course.title,
    course
  })
})

router.get('/:id/edit', auth, async(req, res) => {
  if(req.query.allow === 'true') {
    const course = await Course.findById(req.params.id)
    if (!isOwner(course, req)) {
      return res.redirect('/courses')
    }
    res.render('course-edit', {
      title: 'Редактировать курс',
      course
    })
  } else {
    res.redirect('/')
  }
})

router.post('/edit', auth, courseValidators, async(req, res) => {
  const {id} = req.body
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    //return res.redirect(`/courses/${id}/edit?allow=true`) //Решение из курса
    return res.status(422).render('course-edit', {
      title: 'Редактировать курс',
      isAdd: true,
      error: errors.array()[0].msg,
      course: {
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        id: req.body.id
      }
    })
  }
  
  delete req.body.id
  const course = await Course.findById(id)
  if(!isOwner(course, req)) {
    return res.redirect('/courses')
  }
  Object.assign(course, req.body)
  await course.save()
  res.redirect('/courses')
})

router.post('/remove', auth, async( req, res) => {
  try {
    await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id
    })
    res.redirect('/courses')
  } catch (error) {
    console.log(error);
  }
})

module.exports = router