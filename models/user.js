const {Schema, model} = require('mongoose')

const userShema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  avatarUrl: String,
  resetToken: String,
  resetTokenExp: Date,
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1
      },
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        require: true
      }
    }]
  }
})

userShema.methods.addToCart = function (course) {
  const items = [...this.cart.items]
  const idx = items.findIndex(c => c.courseId.toString() === course._id.toString())
  if (idx >= 0) {
    items[idx].count++
  } else {
    items.push({
      courseId: course._id,
      count: 1
    })
  }
  this.cart = {items}
  return this.save()
}

userShema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items]
  const idx = items.findIndex(c => c.courseId.toString() === id)
  if (items[idx].count === 1) {
    items = items.filter(c => c.courseId.toString() !== id)
  } else {
    items[idx].count--
  }
  this.cart = {items}
  this.save()
}

userShema.methods.clearCart = function () {
  this.cart = {items: []}
  this.save()
}

module.exports = model('User', userShema)