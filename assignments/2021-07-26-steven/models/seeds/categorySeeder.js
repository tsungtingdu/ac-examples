const Category = require('../Category')

const db = require('../../config/mongoose')

const categoryData = [
  ['家居物業', 'fa-home'],
  ['交通出行', 'fa-shuttle-van'],
  ['休閒娛樂', 'fa-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他', 'fa-pen']
].map((category) => ({
  name: category[0],
  icon: category[1]
}))

db.once('open', () => {
  Category.create(categoryData).then(() => {
    console.log('categorySeeder done.')
    return db.close()
  })
})
