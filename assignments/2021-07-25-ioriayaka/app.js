// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')
app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
    helpers: {
      toDate: function (date) {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
          .toISOString()
          .split("T")[0]
      }
    }
 }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`The Express server is running on http://localhost:${PORT}`)
})