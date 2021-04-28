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

// FUNCTIONS 選出得獎者 ＆ 宣布得獎者資訊
function drawWinner (players, prize) {
  // write your code here
    const index = Math.floor(Math.random() * players.length)
    const winner = players[index]
    players.splice(index,1)
   
   announceMsg (winner, prize)

}

function announceMsg (winner, prize) {
  // 新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

// add more functions here （新增 encodeName & encodeEmail 函式進行字串處理 & getTicket ）

function encodeName (name){
  return name.slice(0,2) + '*'.repeat(name.length-2)
}

function encodeEmail(email){
  const emailFront = email.slice(0,email.indexOf('@'))
  const emailBack = email.slice(email.indexOf('@'),email.length)
  return email = emailFront.slice(0, Math.floor(emailFront.length/2))+ '...' + emailBack
}

function getTicket (){
  let ticket = ''
  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ticket += letter[ Math.floor(Math.random() * 26)] 
  ticket += letter[ Math.floor(Math.random() * 26)]
  ticket += Math.floor(Math.random() * 10) 
  ticket += Math.floor(Math.random() * 10)
  ticket += Math.floor(Math.random() * 10)
  ticket += Math.floor(Math.random() * 10)
  
  return ticket
}

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
for (let i = 0 ; i < players.length ; i++){
  players[i]['number'] = getTicket()
}


// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// the rest of players get participation award
for (let i = 0 ; i < players.length ; i++) {
  announceMsg (players[i], '參加獎')
  }