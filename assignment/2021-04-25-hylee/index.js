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

function drawWinner(players, prize) {                   
  const chooseIndex = Math.floor(Math.random() * players.length) 
  const winner = players.splice(chooseIndex, 1)[0] // array 被改變
  announceMsg(winner, prize)
}


function announceMsg(winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

// add more functions here
// 設定彩票號碼 (2個大寫字母 + 4個數字)
function randomCharac () { 
  const charac = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomCharacIndex = Math.floor(Math.random() * charac.length) // 利用字母字串長度隨機選數
  const randomCharac = charac[randomCharacIndex]
  return randomCharac
}

const tickets= []    // 宣告tickets 為 Array

function getTicket () {
  let ticketNumber = ''

  const characts = randomCharac () + randomCharac () // 將2個隨機字母連結
  ticketNumber = ticketNumber + characts             // ticketNumber = '' + 2個隨機字母

  const number = Math.floor(Math.random()*10).toString() + // 0~9 隨機選數，再轉成字串
  Math.floor(Math.random()*10).toString() +                                         
  Math.floor(Math.random()*10).toString() +                                         
  Math.floor(Math.random()*10).toString()

  ticketNumber = ticketNumber + number
  
  if (tickets.indexOf(ticketNumber) >= 0) {
     return getTicket()                        // 遞迴
  } else {
    tickets.push (ticketNumber)                // 將設定好的'ticketNumber'放入 []
    return ticketNumber
  } 
}


// 隱藏姓名
function encodeName(name) { 
  let preName = name.slice(0, 2)

  for (let nameIndex = 0; nameIndex < name.length - 2; nameIndex++) {
    preName += '*'
  }
  return name = preName
}

// 隱藏email
function encodeEmail(email) {
  let splitted = email.split('@')
  // console.log(splitted)            // [ 'name', 'example.com' ]

  let mailName = splitted[0]
  let mailName_hide = mailName.slice(0, mailName.length / 2)
  
  return email = mailName_hide + '...@' + splitted[1]
}

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
// 利用迴圈讓所有人皆獲得一張彩票
for (let eachIndex = 0; eachIndex < players.length; eachIndex++) { 
  players[eachIndex].number = getTicket()
}

// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

console.log('------------------------------------------------')

// the rest of players get participation award
// 利用迴圈讓其它人選獲得參加獎
for (let attendIndex = 0; attendIndex < players.length; attendIndex++) {  
  announceMsg (players[attendIndex], '參加獎')
}