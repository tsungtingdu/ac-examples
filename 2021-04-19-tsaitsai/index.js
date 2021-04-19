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

const tickets = []

// FUNCTIONS /////////////////////////////////////

function drawWinner (players, prize) {
  // write your code here
  const n = Math.floor(Math.random() * players.length)
  const player = players.splice(n, 1)[0]

  announceMsg (player, prize)
  
}

function announceMsg (winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

// add more functions here


// 名字

function encodeName (name) {
  
  const star = '*'
  const nameSliced = name.slice(0, 2) + star.repeat(name.length - 2)
  
  return nameSliced
}

// 信箱

function encodeEmail (email) {

  const dots = '...'
  const address = email.indexOf('@', 0)
  const name = email.slice(0, address)
  const back = email.slice(address, email.length)
  const emailHide = name.slice(0, Math.floor(name.length/2)) + dots + back
  
  return emailHide
}


// 號碼

function getTicket () {

  let ticket = ''
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randNum = Math.floor(Math.random() * 10).toString() + 
            Math.floor(Math.random() * 10).toString() + 
            Math.floor(Math.random() * 10).toString() + 
            Math.floor(Math.random() * 10).toString()
  const randAlpha = alpha.charAt(Math.floor(Math.random() * alpha.length)) + alpha.charAt(Math.floor(Math.random() * alpha.length))

  ticket = randAlpha + randNum
  // indexOf 有存在會在 0~n， 不存在則會返回 -1
  if (tickets.indexOf(ticket) >= 0) {
    return getTicket() //遞迴，重複呼叫直到號碼都不ㄧ樣
  } else {
    tickets.push(ticket)
    return ticket
  }
}

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
// write your code here

for (i = 0; i < players.length; i++) {
  players[i]['number'] = getTicket()
}

// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// the rest of players get participation award
// write your code here

for (i = 0; i < players.length; i++) {
  announceMsg(players[i], '參加獎')
}