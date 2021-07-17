// Require packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')

const routes = require('./routes')
require('./config/mongoose')
const handlebarsHelpers = require('./utils/handlebarsHelpers')

// Express template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./utils/handlebarsHelpers')
}))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})