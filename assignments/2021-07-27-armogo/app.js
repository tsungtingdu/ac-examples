// include packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const rstrtList = require('./restaurant.json')

// set up template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {rstrts: rstrtList.results})
})

// show specific restaurant details
app.get('/restaurants/:id', (req, res) => {
  const rstrt = rstrtList.results.find(rstrt => rstrt.id.toString() === req.params.id)
  res.render('show', {rstrt: rstrt})
})

// search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.replace(/ +/g, "")
  const rstrts = rstrtList.results.filter(rstrt => {
    return rstrt.category.toLowerCase().includes(keyword.toLowerCase()) ||
    rstrt.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {rstrts: rstrts, keyword: keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
}) 