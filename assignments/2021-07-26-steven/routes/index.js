// apply Express and Express Router
const express = require('express')
const router = express.Router()

// apply modules
const home = require('./modules/home')
const records = require('./modules/records')

// direct request that conform with string "/" to home module
router.use('/', home)

// direct request that conform with string "/records" to records module
router.use('/records', records)

// exports router
module.exports = router
