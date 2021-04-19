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
const tickets=[]


function drawWinner (players,prize) {
   
  const n = Math.floor(Math.random() * players.length)
  const winner = players.splice(n, 1)[0]
  announceMsg(winner, prize)  
}

function announceMsg (winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  function encodeName (name) {
    let hidden = ''
    let hiddenlength = name.length-2
    for (let i = 0; i < hiddenlength; i++) {
      hidden += '*'
    }
    name = name.slice(0,2) + hidden
    return name   
  }

  function encodeEmail (email) {
    let name = email.slice(0, email.indexOf('@'))
    let emailname = email.slice(email.indexOf('@'), email.length)
    let hidden_name = name.slice(0,3)
    name = hidden_name + '...' + emailname
    return name
  }

  console.log(`${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

// add more functions here

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
// write your code here
function getticket () {
  let ticket = ''
  let char = ''
  let num = ''
  let char_n = 2
  let num_n = 4
   
  for (let i = 0; i < char_n; i++) {
    char += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
  }

  for (let i = 0; i < num_n; i++) {
    num += Math.floor(Math.random() * 10)
  }  
  ticket = char + num
  //indexOf如果查找不到會給予-1,此處>=0表示如果存入陣列的彩券如有重複
  //則再重新執行一次getticket()
  //如沒重複則把產生的彩券存入陣列中
  if (tickets.indexOf(ticket) >= 0){
    return getticket()//遞迴
  } else {
    tickets.push(ticket)
    return ticket 
  }   
    
}
//給予每人彩券號碼  
for (let i = 0; i < players.length; i++) {
  players[i]['number'] = getticket()
  
}
// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')
// the rest of players get participation award
// write your code here

//用for迴圈給予沒有賜獎的人參加獎
for (let i = 0; i < players.length; i++) {
  announceMsg(players[i],'參加獎')
}