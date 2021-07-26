const Category = require('../category');
const db = require('../../config/mongoose');

const categoryData = [
    { categoryName: '家居物業', categoryIcon: 'fas fa-home'},
    { categoryName: '交通出行', categoryIcon: 'fas fa-shuttle-van' },
    { categoryName: '休閒娛樂', categoryIcon: 'fas fa-grin-beam' },
    { categoryName: '餐飲食品', categoryIcon: 'fas fa-utensils' },
    { categoryName: '其他',    categoryIcon: 'fas fa-pen' },
]

db.once('open', () => {
    Category.create(categoryData)
        .then(() => {
            console.log('Success to set the category seeder.');
            return db.close();
        })
        .catch(err => console.error(err))
});