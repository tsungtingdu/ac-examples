const express = require('express')
const router = express.Router()

const home = require('./modules/home.js')
const shorten = require('./modules/shorten.js')

router.use('/', home)
router.use('/shorten', shorten)

module.exports = router
