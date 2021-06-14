const restaurant = require('../restaurant')  //載入restaurant model
const rawData = require('../../restaurant.json') //載入restaurant資料
const db = require('../../config/mongoose')

db.once('open', () => {              // 連線成功
  restaurant.create(
    rawData.results
  )
  console.log('mongodb connected!')
})