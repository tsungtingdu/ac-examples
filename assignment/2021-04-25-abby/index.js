let players = [
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

/// 1. 產生彩券號碼
function getTicket (){
  let ticket = ''
  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let i = 1 ; i < 3 ; i++ ){
    ticket += letter[ Math.floor(Math.random() * 26)]
  }
  
  for (let i = 1 ; i < 5 ; i++){
   ticket += Math.floor(Math.random() * 10)  
  }  
  return ticket
}
//// 不太明白如何使用號碼不重複的功能 ////

/// 2. 加密
function encodeName (name) {
  name = name.slice(0, 2) + '*'.repeat(name.length - 2)
  return name
}

function encodeEmail (email) {
  const emailStart = email.slice(0, email.indexOf('@'))
  const emailEnd = email.slice(email.indexOf('@'))
  email = emailStart.slice(0, emailStart.length / 2) + '...' + emailEnd
  return email
}

/// 3. 抽獎
function drawWinner (players, prize) {
  const num = Math.floor(Math.random() * players.length) // 產亂數
  const win = players.splice(num, 1) [0]
  announceMsg(win, prize)
}

function announceMsg (win, prize) {
  console.log(`${win.ticket} | ${encodeName(win.name)} | ${encodeEmail(win.email)} | ${prize}`)
}

/// 4. 分配彩券
for (let player of players) {
  player.ticket = getTicket()
}

// for (let i = 0 ; i < players.length ; i++){
//   players.ticket = getTicket()
// }

drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')
for (let i = 0 ; i < players.length ; i++) {
  announceMsg (players[i], '參加獎')
  }
  