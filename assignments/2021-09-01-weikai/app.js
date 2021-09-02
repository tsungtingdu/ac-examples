// include express and express-handlebars
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// change view engine
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

// use public
app.use(express.static('public'))

// home page route
app.get('/', (req, res) => {
  res.render('home')
})

// about page route
app.get('/about', (req, res) => {
  res.render('about')
})

// portfolio page route
app.get('/portfolio', (req, res) => {
  res.render('portfolio')
})
// contact page route
app.get('/contact', (req, res) => {
  res.render('contact')
})

// listen server
app.listen(port, () => {
  console.log(`Web is running on http://localhost:${port}`)
})