function createPlayer(name, hp, mp) {
  return {
    name: name,
    hp: hp,
    mp: mp,
    cure: function (point) {
      // write your code
      if(magician.hp > 0){
        console.log('Magician HP recovered!')
        if(magician.mp >= 2 * point){
          if(magician.hp + point <= magOriginHp){
            magician.mp -= 2 * point
            magician.hp += point
          }else{
          magician.mp -= 2 * (magOriginHp - magician.hp)
          magician.hp = magOriginHp
          }
        }else{
        console.log('You do not have enough power!')
        }
      }else{
        console.log('Sorry, You are already dead!')
      }
      return magician
    },
    attack: function (enemy) {
      // write your code
      let damage = Math.floor(Math.random() * 30) + 1
      console.log(`Warrior hit Magician.   Magician lose ${damage} hp.`)
      if(damage >= enemy.hp){
        enemy.hp = 0
        console.log('Game Over!')
      }else{
        enemy.hp -= damage
      }
      return magician
    }
  }
}

const magician = createPlayer('Magician', 30, 100)
const warrior = createPlayer('Warrior', 100, 30)
const magOriginHp = magician.hp

console.log('====== create players ======')
console.log(magician) // {name: "Magician", hp: 30, mp: 100}
console.log(warrior) // {name: "Warrior", hp: 100, mp: 30}
console.log('====== start fight ======')
console.log(warrior.attack(magician))
console.log(magician.cure(30))