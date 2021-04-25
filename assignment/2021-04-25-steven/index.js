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

// FUNCTIONS /////////////////////////////////////

function getTicket () {
  let ticket = [];
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let numbers = '0123456789'

  for (let char = 0; char < 2; char ++) {
  ticket.push(characters.charAt(Math.floor(Math.random() * characters.length)));
  }
  for (let num = 0; num < 4; num ++ ) {
  ticket.push(numbers.charAt(Math.floor(Math.random() * numbers.length)))
  }
  ticket = ticket.join('')
  return ticket
}

function drawWinner (players, prize) {
  // write your code here
  let index = Math.floor(Math.random() * players.length)
  let winner = players.splice(index, 1)[0]
  announceMsg(winner, prize)
}


function announceMsg(winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

function encodeName(name) {
  let encryptName = name.slice(0,2)
  for (count = 0; count < name.length -2; count++) {
    encryptName += '*';
  }
  return name = encryptName
}

function encodeEmail(email) {
  let name = email.slice(0, email.indexOf('@'))
  let encryptName = name.slice(0, name.length/2)
  return email = encryptName + '...' + email.slice(email.indexOf('@'), email.length)
}

// add more functions here

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
// write your code here
for (let player of players) {
  player.number = getTicket()
}
// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// the rest of players get participation award
// write your code here
players.forEach(player => announceMsg(player, '參加獎'))