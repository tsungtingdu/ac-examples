const express = require('express');
const moment = require('moment');

const router = express.Router();
const Category = require('../../models/category');
const Record = require('../../models/record');

router.get('/', async (req, res) => {
    const category = req.query.category;
    const selected = category;

    const categories = [];

    await Category.find()
            .lean()
            .then(category => categories.push(...category))
            .catch(error => console.log(error))

    const filterdata = (!category || category === 'all') ? {} : {'category': category};

    let totalAmount = 0;

    Record.find(filterdata)
            .lean() 
            .then(records => {
         
                records.map(record => {
                    totalAmount += record.amount;
                    record.date = moment(new Date(record.date)).format('YYYY/MM/DD');
                    categories.map(data => {
                        if (data.categoryName === record.category) { record.categoryIcon = data.categoryIcon }
                    });
                });

                res.render('index', { records, categories, totalAmount, selected })
            })
            .catch(error => console.error(error))
});

module.exports = router;