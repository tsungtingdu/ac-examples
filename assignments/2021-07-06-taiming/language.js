const person =require('./people.json')
const phrase = ['很簡單','很容易','很快','很正常','沒問題的','辦不到嗎','很困難嗎']

function sample (array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateLanguage (options) {
  if (!options.job){return '請選一個人物!'}else{
   return `身為一個${person.target[options.job].title},只是${sample(person.target[options.job].task)},${sample(person.phrase)}`
  }
    
}


module.exports = generateLanguage

