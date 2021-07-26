// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const helpers = require('./tools/handlebarsHelpers')
const hbsHelpers = require('handlebars-helpers')(['comparison'])

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine(
  'hbs',
  exphbs({ defaultLayout: 'main', extname: '.hbs', helpers, hbsHelpers })
)
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
