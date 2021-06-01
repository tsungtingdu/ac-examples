const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
const routes = require('./routes')
require('./config/mongoose')

const exphbs = require('express-handlebars')
const router = require('./routes')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) {
      return a === b
    }
  }
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})