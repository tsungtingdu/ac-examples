function sample(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function generateRandomCode() {
  const source = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  let randomCode = ''
  
  for (let i = 0; i < 5; i++) {
    randomCode += sample(source)
  }

  return randomCode
}

module.exports = generateRandomCode