const db = require('../../config/mongoose')
const categoriesJson =  require('../../data/categories.json');
const Category = require('../category')

db.once('open', () => {
  console.log('mongodb connected~')
  
  Category.create(categoriesJson)
  .then(()=>{
    db.close();
    console.log('done');
  })

})