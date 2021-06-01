const isRatingType = (input) => {
  if (isNaN(input)) {
    return false
  }
  return (input > 0) && (input * 10 <= 50)
}

module.exports = {
  validator: (req, res, next) => {
    const restaurantObject = req.body
    restaurantObject._id = req.params.restaurant_id
    console.log('into middleware/validator/', restaurantObject._id)
    const categories = ['咖啡', '酒吧', '義式餐廳', '美式', '日本料理', '中東料理', '台式', '韓式', '中式', '港式', '泰式']
    const errors = []

    if (!restaurantObject.name || !restaurantObject.category || !restaurantObject.rating) {
      errors.push({ message: '姓名、類別、評價 為必填欄位' })
    }
    if (!categories.includes(restaurantObject.category)) {
      errors.push({ message: '類別需屬由既有清單中選擇' })
    }
    if (!isRatingType(restaurantObject.rating)) {
      errors.push({ message: '評分必須介於0到5之間' })
    }
    if (restaurantObject.image && restaurantObject.image.slice(0, 4) !== 'http') {
      errors.push({ message: '圖片網址請輸入http開頭的有效連結' })
    }
    if (restaurantObject.google_map && restaurantObject.google_map.slice(0, 4) !== 'http') {
      errors.push({ message: 'Google Map 請輸入 http 開頭的有效連結' })
    }

    res.locals.errors = errors
    res.locals.restaurantObject = restaurantObject

    next()
  }
}
