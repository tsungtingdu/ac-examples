// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const validUrl = require('valid-url')
const Url = require('./models/url')
let baseUrl 

const filterShortUrl = require('./models/modifyUrl')

require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl.trim()
  console.log(req.headers.host)
  if (!validUrl.isUri(inputUrl)) {
    const errorMsg = 'Invalid URL! Please input valid URL.'
    return res.render('index', { errorMsg, inputUrl })
  }
  if (validUrl.isUri(inputUrl)) {
    const randomUrl = filterShortUrl()
    const originalUrl = inputUrl
    if (req.headers.host === 'localhost:3000') {
      baseUrl = `http://${req.headers.host}/`
    } else {
      baseUrl = `https://${req.headers.host}/`
    }
    const shortUrl = baseUrl + randomUrl

    Url.create({
      originalUrl: originalUrl,
      shortUrl: shortUrl,
      randomUrl: randomUrl
    })
      .then(() => {
        res.render('success', { randomUrl, shortUrl })
      })
      .catch((error) => console.log(error))
  }
})

app.get('/:id', (req, res) => {
  const shortUrl = baseUrl + req.params.id
  const randomUrl = req.params.id
  Url.find({ randomUrl: randomUrl })
    .lean()
    .then((urlResult) => {
      if (urlResult.length === 1) {
        res.redirect(urlResult[0].originalUrl)
      } else {
        res.redirect('/')
      }
    })
    .catch((error) => console.error(error))
})

app.listen(PORT, () => {
  console.log(`The Express server is running on http://localhost:${PORT}`)
})