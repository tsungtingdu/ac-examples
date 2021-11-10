const db = require('../../config/mongoose')
const Category = require('../category')
const category = [
  {
    name: '家居物業',
    en_name: 'home',
    icon: 'fas fa-home'
  },
  {
    name: '交通出行',
    en_name: 'transportation',
    icon: 'fas fa-shuttle-van'
  },
  {
    name: '休閒娛樂',
    en_name: 'entertainment',
    icon: 'fas fa-grin-beam'
  },
  {
    name: '餐飲食品',
    en_name: 'food',
    icon: 'fas fa-utensils'
  },
  {
    name: '其他',
    en_name: 'others',
    icon: 'fas fa-pen'
  }
]
db.once('open', () => {
  Category.create(category)
  .then(() => {
    console.log('Add category seeder done...')
    return db.close()
  })
  .then(() => {
    console.log('database connection close...')
  })
})