const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const title = [
    'About',
    'Portfolio',
    'Contact'
]

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:title', (req, res) => {
  const changeTitle = title.find((title) => title.toLocaleLowerCase() === (req.params.title.toLocaleLowerCase()))

  res.render('show_title', { title: changeTitle })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})