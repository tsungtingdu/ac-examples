const Url = require('../url')
const db = require('../../config/mongoose')


const data = [
  {
    originalUrl: 'https://www.youtube.com/',
    shortUrl: 'http://localhost:3000/9g6fo',
    randomUrl: '9g6fo'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  Url.create(data)
    .then(() => {
      console.log('Success to set the Seeder!')
      return db.close()
    })
    .then(() => {
      console.log('database connection close...')
    })
    .catch(err => console.error(err))
})