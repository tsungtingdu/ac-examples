const express = require('express')
const router = express.Router()

const ShortUrl = require('../../models/url.js')

const wordbag = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

function getShortenWords() {
  let d = Date.now()

  return 'xxxxx'.replace(/x/g, function (c) {
    const r = (d + Math.random() * wordbag.length) % wordbag.length | 0
    d = Math.floor(d / wordbag.length)
    return wordbag[r]
  })
}

router.get('/', (req, res) => {
  const oriUrl = req.query.originUrl.toLowerCase()
  const host = req.headers.host
  let shortUrl = ''
  return ShortUrl.find({ url: oriUrl })
    .lean()
    .then((urls) => {
      if (urls.length === 0) {
        shortUrl = getShortenWords()
        ShortUrl.create({
          url: oriUrl,
          shorten: shortUrl
        })
        .then(() => {
          return
        })
        .catch((err) => console.log(err))
      } else {
        shortUrl = urls[0].shorten
      }
    })
    .then(() => {
      return res.render('show', { originUrl: oriUrl, host: host, shorten: shortUrl })
    })
    .catch((err) => console.log(err))
})

module.exports = router
