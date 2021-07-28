const Url = require('./url')

function filterShortUrl() {
  let randomUrl = generateShortUrl(5)
  // let shortUrl = baseUrl + randomUrl
  Url.find({ randomUrl: randomUrl })
    .lean()
    .then((findUrl) => {
      randomUrl = findUrl.length ? generateShortUrl(5) : randomUrl
    })
    .catch((error) => console.log(error))
  return randomUrl
}

// define sample function to randomly return an item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define numbers + letters function 
function generateShortUrl(length) {
  // define things user might want
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store things user picked up
  let collection = lowerCaseLetters + upperCaseLetters + numbers
  let randomUrl = ''
  for (let i = 0; i < length; i++) {
    randomUrl += sample(collection)
  }
  return randomUrl
}

// invoke filterShortUrl function
module.exports = filterShortUrl