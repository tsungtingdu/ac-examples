function createPlayer(name, hp, mp) {
  return {
    name: name,
    hp: hp,
    mp: mp,
    cure: function (point) {            
      if (this.hp <= 0) {
        return 'Game Over!'
        // 需先根據point判斷mp是否足夠施放
      } else if (this.mp >= point * 2) {
        // 根據回復血量來調mp值
        point >= hp ? this.mp -= (hp - this.hp) * 2 : this.mp -= (point) * 2 
        // 血量最多只能回復至原有血量        
        point + this.hp > hp ? this.hp = hp : this.hp += point        
        console.log(`${this.name} HP recoverd.`)
        return this
      } else {
        return "You don't have enough mp"
      }
      
    },
    attack: function (enemy) {
      // 随機產生 1~100 的攻擊
      let damage = Math.floor(Math.random() * 100) + 1      
      
      console.log(`${this.name} hit ${enemy.name}. ${enemy.name} lose ${damage} HP.`)

      if (damage > enemy.hp) {
        enemy.hp = 0
        console.log(`${enemy.name} is dead.`)
      } else {
        enemy.hp -= damage
      }      
      return enemy
    }
  }
}

const magician = createPlayer('Magician', 30, 100)
const warrior = createPlayer('Warrior', 100, 30)

console.log('====== create players ======')
console.log(magician) // {name: "Magician", hp: 30, mp: 100}
console.log(warrior) // {name: "Warrior", hp: 100, mp: 30}
console.log('====== start fight ======')
console.log(warrior.attack(magician))
console.log(magician.cure(30))
