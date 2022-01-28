const express = require('express')
const router = express.Router()
const generateRandomCode = require('../../tools/randomCode')
const ShortedURL = require('../../models/shortedURL')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const { inputURL } = req.body
  const record = await ShortedURL.findOne({ targetURL: inputURL }).lean()
  let randomCode
  let shortedURL
  if (record) {
    randomCode = record.randomCode
  } else {
    randomCode = generateRandomCode()
    await ShortedURL.create({ randomCode, targetURL: inputURL })
  }
  if (req.headers.host === 'localhost:3000') {
    shortedURL = `http://${req.headers.host}/${randomCode}`
  } else {
    shortedURL = `https://${req.headers.host}/${randomCode}`
  }
  res.render('index', { shortedURL })
})

router.get('/:randomCode', async (req, res) => {
  const randomCode = req.params.randomCode
  const url = await ShortedURL.findOne({ randomCode }).lean()
  res.redirect(url.targetURL)
})

module.exports = router