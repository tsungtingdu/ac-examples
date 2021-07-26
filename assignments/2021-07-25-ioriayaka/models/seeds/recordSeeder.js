const db = require('../../config/mongoose')
const Record = require('../record')
const data = [
  {
    name: '午餐-樓下麵店',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60
  },
  {
    name: '晚餐-響食天堂',
    category: '餐飲食品',
    date: '2021-07-16',
    amount: 60
  },
  {
    name: '捷運-板南線',
    category: '交通出行',
    date: '2021-07-16',
    amount: 120
  },
  {
    name: '電影:鋼鐵擂台',
    category: '休閒娛樂',
    date: '2021-07-15',
    amount: 220
  },
  {
    name: '租金',
    category: '家居物業',
    date: '2021-06-01',
    amount: 25000
  }
]

db.once('open', () => {
  Record.create(data)
  .then(() => {
    console.log('Add Record Seeder done!')
    return db.close()
  })
  .then(() => {
    console.log('databaes connectoin close...')
  })
})