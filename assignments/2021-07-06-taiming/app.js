const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateLanguage = require('./language.js')
const person = require('./people.json')
const port =3000

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({exteded:true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {targets: person.target})
})

app.post('/', (req, res) => {
  const options = req.body
  const language = generateLanguage(options)
  res.render('index', {language: language, targets: person.target, options:options})  
})

app.listen(port, () =>{
  console.log(`Express app listening on port ${port}.`)
})