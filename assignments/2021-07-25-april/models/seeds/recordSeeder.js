const Records = require('../record');
const db = require('../../config/mongoose');

const recordSeedData = [
    { name: '早餐', date: '2021/07/19', category: '餐飲食品', amount: 60 },
    { name: '晚餐', date: '2021/07/19', category: '餐飲食品', amount: 200 },
    { name: '買衣服', date: '2021/07/19', category: '休閒娛樂', amount: 800 },
    { name: '捷運', date: '2021/07/19', category: '交通出行', amount: 120 },
    { name: '公車', date: '2021/07/19', category: '交通出行', amount: 120 },
    { name: '水電費', date: '2021/07/19', category: '家居物業', amount: 1200 }
]

db.once('open', () => {
    Records.create(recordSeedData)
        .then(() => {
            console.log('Success to set the records seeder.');
            return db.close();
        })
        .catch(err => console.error(err))
});