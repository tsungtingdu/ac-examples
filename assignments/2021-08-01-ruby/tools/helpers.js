// check url validation
function urlInputValidation(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/
  return regex.test(url)
}
// Ref: https://stackoverflow.com/questions/1410311/regular-expression-for-url-validation-in-javascript

// define sample function to randomly select an item from an array
function sample(array) {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}

// define generateShortUrl function
function generateShortUrl() {
  // define components for Url
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to put in all items
  let collectionItems = lowerCaseLetters + upperCaseLetters + numbers
  let collection = []
  collection = collectionItems.split('')

  let shortUrl = ''
  // generate random shortUrl
  for (i = 1; i <= 5; i++) {
    shortUrl += sample(collection)
  }

  // return shortUrl
  return shortUrl
}

module.exports = { generateShortUrl, urlInputValidation }