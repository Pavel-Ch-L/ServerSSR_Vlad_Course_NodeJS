const {Router} = require('express')
const router = Router()
const Order = require('../models/orders')
const auth = require('../middleware/auth.js')

router.get('/', auth, async(req, res) => {
  const userOrders = await Order.find({'user.userId': req.user._id}).populate(['user.userId'])
  const orders = userOrders.map(c => ({
    ...c._doc,
    price: c.courses.reduce((total, next) => {
      return total += next.count * next.course.price
    }, 0)
  }))
  res.render('orders', {
    isOrders: true,
    title: 'Заказы',
    orders
  })
})

router.post('/', auth, async(req, res) => {
  const user = await req.user.populate(['cart.items.courseId'])
  const courses = user.cart.items.map(c => ({
    count: c.count,
    course: {...c.courseId._doc}
  }))
  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user._id
    },
    courses
  })
  await order.save()
  await req.user.clearCart()
  res.redirect('orders')
})

module.exports = router