const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

const generateSearchCondition = (keyword, userId) => {
  return {
    '$or': [
      { 'name': { $regex: keyword, $options: '$i' } },
      { 'category': { $regex: keyword, $options: '$i' } }
    ],
    userId: userId
  }
}

const generateObjectForSort = (sortString) => {
  let outputObject = {
    sortForExpress: {},
    sortForHandlebars: {
      isNameAsc: false,
      isNameDesc: false,
      isCategoryAsc: false,
      isRatingDesc: false
    }
  }

  switch (sortString) {
    case 'isNameAsc':
      outputObject.sortForExpress = { name: 'asc' }
      outputObject.sortForHandlebars.isNameAsc = true
      break
    case 'isNameDesc':
      outputObject.sortForExpress = { name: 'desc' }
      outputObject.sortForHandlebars.isNameDesc = true
      break
    case 'isCategoryAsc':
      outputObject.sortForExpress = { category: 'asc' }
      outputObject.sortForHandlebars.isCategoryAsc = true
      break
    case 'isRatingDesc':
      outputObject.sortForExpress = { rating: 'desc' }
      outputObject.sortForHandlebars.isRatingDesc = true
      break
  }

  return outputObject
}

router.get('/', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.trim()
  const userId = req.user._id
  const searchCondition = generateSearchCondition(keyword, userId)
  const { sortForExpress, sortForHandlebars } = generateObjectForSort(sort)

  return Restaurant.find(searchCondition)
    .lean()
    .sort(sortForExpress)
    .then(restaurants => res.render('index', { restaurants, keyword, sortForHandlebars }))
    .catch(err => console.log(err))
})

module.exports = router