const Record = require('../Record')
const Category = require('../Category')

let recordData = [
  ['家樂福採買', '2021/07/25', '家居物業', 553],
  ['機車加油', '2021/07/25', '交通出行', 125],
  ['Netflix月費', '2021/07/24', '休閒娛樂', 390],
  ['保險費', '2021/07/23', '其他', 25830],
  ['早餐', '2021/07/23', '餐飲食品', 79]
]

const db = require('../../config/mongoose')

db.once('open', () => {
  const categoryList = {}

  Category.find()
    .lean()
    .then((categories) => {
      categories.forEach((category) => {
        categoryList[category.name] = category._id
      })
      return recordData.map((record) => ({
        name: record[0],
        date: record[1],
        category: categoryList[record[2]],
        amount: record[3]
      }))
    })
    .then((recordData) => {
      Record.create(recordData).then(() => {
        console.log('recordSeeder done.')
        return db.close()
      })
    })
    .catch((error) => console.error(error))
})
