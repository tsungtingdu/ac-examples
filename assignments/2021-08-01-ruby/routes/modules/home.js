const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const { urlInputValidation, generateShortUrl } = require('../../tools/helpers')


// Get home page
router.get('/', (req, res) => {
  res.render('index')
})

// Create short URL
router.post('/', async (req, res) => {
  // check if input url is valid
  const inputUrl = req.body.inputUrl.trim()
  const notValidUrl = !urlInputValidation(inputUrl)
  if (notValidUrl) {
    return res.render('index', { notValidUrl, inputUrl })
  }

  const projectUrl = req.protocol + '://' + req.get('host') + '/'
  // check if url exists
  const url = await Url.find({ inputUrl }).lean().catch(error => console.log(error))
  if (url.length !== 0) {
    return res.render('short', { projectUrl, shortUrl: url[0].shortUrl })
  }
  // if not, generate unique short url
  const shortUrlArr = await Url.find().distinct('shortUrl').lean().catch(error => console.log(error))
  let tempUrl = ''
  do {
    tempUrl = generateShortUrl()
  } while (shortUrlArr.includes(tempUrl))

  return Url.create({
    inputUrl: inputUrl,
    shortUrl: tempUrl
  })
    .then(() => res.render('short', { projectUrl, shortUrl: tempUrl }))
    .catch(error => console.log(error))
})

// link to original url
router.get('/:id', (req, res) => {
  Url.find({ shortUrl: req.params.id })
    .lean()
    .then(url => {
      res.redirect(url[0].inputUrl)
    })
    .catch(error => console.log(error))
})

module.exports = router