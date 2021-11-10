const express = require('express');
const router = express.Router();
const Category = require('../../models/category');
const Record = require('../../models/record');
const moment = require('moment');

const categories = [];

Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.log(error))

router.get('/new', async (req, res) => {
    return res.render('new', {categories});
});

router.post('/', (req, res) => {
    return Record.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    return Record.findById(id)
        .lean()
        .then(record => {
            record.date = moment(record.date).format('YYYY-MM-DD')
            res.render('edit', { record, categories })
        })
        .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    return Record.findById(id)
        .then(record => {
            record = Object.assign(record, req.body);
            return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));

});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
});

module.exports = router;