const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose.js')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
