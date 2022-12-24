const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const auth = require('../middleware/auth.js')

function mapCartItems(cart) {
  return cart.items.map(c => ({
    id: c.courseId._id.toString(),
    title: c.courseId.title,
    count: c.count,
    price: c.courseId.price
  }))
}

function computePrice(courses) {
  return courses.reduce((total, next) => {
    return total += next.count * next.price
  }, 0)
}

router.get('/', auth, async(req, res) =>{
  const user = await req.user.populate(['cart.items.courseId'])
  const cart = {
    courses: mapCartItems(user.cart),
    price: computePrice(mapCartItems(user.cart))
  }
  res.render('cart', {
    title: 'Корзина',
    isCart: true,
    cart
  })
})

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/cart')
})

router.delete('/remove/:id', auth,  async(req, res) => {
  await req.user.removeFromCart(req.params.id)
  const user = await req.user.populate(['cart.items.courseId'])
  const cart = {
    courses: mapCartItems(user.cart),
    price: computePrice(mapCartItems(user.cart))
  }
  res.json(cart)
})

module.exports = router