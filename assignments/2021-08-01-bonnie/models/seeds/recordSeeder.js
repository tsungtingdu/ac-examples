const db = require('../../config/mongoose')

const RecordsJson =  require('../../data/records.json');
const Record = require('../record')

db.once('open', () => {
  console.log('mongodb connected~')
  
  Record.create(RecordsJson)
  .then(()=>{
    db.close();
    console.log('done');
  })

})