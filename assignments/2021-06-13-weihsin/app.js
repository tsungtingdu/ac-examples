// require package used in the project
const express = require('express')
const app = express()
const port = 3000

// read models seeder
const restaurant = require('./models/restaurant')

// set express handlebars(exphbs)
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

// set handlebars-helpers
const hbshelpers = require('handlebars-helpers')
const helpers = hbshelpers()

// connect mongoose setting
require('./config/mongoose')

// setting body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

// setting method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 引用 routes
const routes = require('./routes')
app.use(routes)

//start and listen on the Express server
app.listen(port, () => {
})

