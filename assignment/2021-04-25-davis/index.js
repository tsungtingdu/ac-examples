// DATA /////////////////////////////////////

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

// 儲存產生的抽獎號碼，並用於檢查重複號碼
const ticketNum= []

// FUNCTIONS /////////////////////////////////////

//隨機抽獎後，將中獎人踢出『players』物件
function drawWinner (players, prize) {
  // write your code here
  let i = Math.floor(Math.random(players.length))
  let winner = players.splice (i, 1)[0] //勿忘嘉玲，讀取陣列
  return announceMsg (winner, prize)
}

//處理並且輸出字串
function announceMsg (winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

// add more functions here
//加密姓名
function encodeName (name) {
  let star =``
  for (i = 2; i < name.length; i++) {
    star = star + `*`
  }
  return name.slice(0, 2) + star
}
//加密email
function encodeEmail (email) {
return email.slice(0, Math.floor(email.indexOf(`@`) / 2)) + `...` + email.slice(email.indexOf(`@`), email.length + 1)
}

//產生彩券號碼
function ticketGen () {
  ticket = ``
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (i = 0; i < 2; i++) {
    ticket += alphabet[Math.floor(Math.random() * 
    alphabet.length)]
  }
  for (i = 0; i < 4; i++) {
    ticket += Math.floor(Math.random() * 10)
    }
// 加入檢查重複號碼
if (ticketNum.indexOf(`ticket`) >= 0) {
  return ticketGen
  }else {
    ticketNum.push(ticket)
    return ticket
    }
}

// EXECUTING /////////////////////////////////////
//彩券號碼，加入物件
for (let i =0; i < players.length; i++) {
  players[i].number = ticketGen()
}


// each player gets a lottery ticket
// write your code here

// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// the rest of players get participation award
// write your code here

for (let i =0; i < players.length; i++) {
  announceMsg(players[i], `參加獎`)
}