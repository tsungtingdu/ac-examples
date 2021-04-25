const players = [
  { name: 'Bernard', email: 'bernard@example.com' },
  { name: 'Youchi', email: 'youchi@example.com' },
  { name: 'Yenting', email: 'yenting@example.com' },
  { name: 'Angela', email: 'angela@example.com' },
  { name: 'Yvonne', email: 'yvonne@example.com' },
  { name: 'Ellen', email: 'ellen@example.com' },
  { name: 'Walter', email: 'walter@example.com' },
  { name: 'Kevin', email: 'kevin@example.com' },
  { name: 'Tim', email: 'tim@example.com' },
  { name: 'Russell', email: 'russell@example.com' }
]

//隨機抽選中獎者
function drawWinner (players, prize) {
  i = Math.floor(Math.random() * players.length)
  winner = players.splice(i,1)[0]
  announceMsg (winner, prize)
}

//最後宣布中獎者名單
function announceMsg (winner, prize) {
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
  }

//將姓名加密
function encodeName (name) {
  name = winner.name.slice(0,2)+'*'.repeat(winner.name.length-2)
  return name
}

//將email加密
function encodeEmail (email) {
  half = winner.email.slice(0,winner.email.indexOf('@')/2)
  middle = '...'
  domain = winner.email.slice(winner.email.indexOf('@'),winner.email.length)
  email = half + middle + domain
  return email
}

//購買後隨機提供亂碼彩券號碼
function lottery(){
  let number = ''
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  first = alphabet[Math.floor(Math.random() * 26)]
  second = alphabet[Math.floor(Math.random() * 26)]
  third = Math.floor(Math.random() * 10)
  fourth = Math.floor(Math.random() * 10)
  fifth = Math.floor(Math.random() * 10)
  sixth = Math.floor(Math.random() * 10)

  number = first + second + third + fourth + fifth + sixth
  return number
}

//號碼出來後將號碼加至每個消費者資料內
for (let i = 0 ; i < players.length ; i++) {
  players[i] ['number'] = lottery ()
}


drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')
//其他人為參加獎
while( players.length > 0){
  drawWinner(players, '參加獎')
}