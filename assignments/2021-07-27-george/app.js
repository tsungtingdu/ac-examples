const express = require('express')
const ephbs = require('express-handlebars')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

require('./config/mongoose')

const app = express()

app.engine('handlebars', ephbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})