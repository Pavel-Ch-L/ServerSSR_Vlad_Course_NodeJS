const keys = require('./keys/index.js')
const path = require('path')
const flash = require('connect-flash')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const routeHome = require('./routes/routerHome')
const routeCart = require('./routes/routerCart')
const routeCourses = require('./routes/routerCourses')
const routeAdd = require('./routes/routerAdd')
const routeOrders = require('./routes/routerOrders')
const routeAuth = require('./routes/routerAuth')
const routeProfile = require('./routes/routerProfile')
const varMiddleware = require('./middleware/vareables')
const userMiddleware = require('./middleware/user')
const csrf = require('csurf')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')

const PORT = process.env.PORT || 3000
const app = express()

//Конфигурация heandlebarse
const hbs = exphbs.create({
 defaultLayout: 'main',
 extname: 'hbs',
 handlebars: allowInsecurePrototypeAccess(Handlebars),
 helpers: require('./utils/hbs-helpers')
})
//Регистрация движка
app.engine('hbs', hbs.engine)
//Начинаем использовать движек
app.set('view engine', 'hbs')
//Название папки шаблонов (по умолчанию views)
app.set('views', './views')
//Регистрируем публичную папку
app.use(express.static(path.join(__dirname,'public')))
app.use('/images', express.static(path.join(__dirname,'images')))
//bufer translate
app.use(express.urlencoded({extended: true}))
const store = new MongoStore({
  collection: 'sessions',
  uri: keys.mongoUrl
})
app.use(session({
  secret: keys.secret,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}))
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', routeHome)
app.use('/courses', routeCourses)
app.use('/add', routeAdd)
app.use('/cart', routeCart)
app.use('/orders', routeOrders)
app.use('/auth', routeAuth)
app.use('/profile', routeProfile)

app.use(errorHandler)

async function start() {
  try {
    await mongoose.connect(keys.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
      console.log('process.env.NODE_ENV === ', process.env.NODE_ENV === 'production' ? 'production' : 'develop');
    })
  } catch (error) {
    console.log(error);
  }
}

start()